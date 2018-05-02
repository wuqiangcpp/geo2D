import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (on,onMouseOver,onMouseOut,onWithOptions,onInput,onClick)
import Json.Decode as Decode
import Mouse exposing (Position)
import DictList as Dict
import Svg as S
import Svg.Attributes as SA
import Debug
import Regex as R

--import Parser exposing (..)
--import Char


                
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

type alias Label=String
type alias PLabel=String
type alias LLabel=String


--free point(FP), point on line (POL), free POL(FPOL), two line intersection(P2L)
type Point =FP Position | POL LLabel Float Float | FPOL LLabel Position | P2L LLabel LLabel
type alias Points=Dict.DictList String Point

type Line=Line2P {a:Position, b:Position} | LineAB {a:PLabel,b:PLabel}
type alias Lines=Dict.DictList LLabel Line

    
type alias State={dragging:Bool,labelDragging:Bool}
defaultSta:State
defaultSta={dragging=False,labelDragging=False}
--(point position,label position,state)     
type alias Pinfo={pos:Position,labelPos:(Maybe Position),state:State}
type alias PList=Dict.DictList PLabel Pinfo
type alias Linfo={twoPos:{a:Position,b:Position},state:State}
type alias LList=Dict.DictList LLabel Linfo
type alias Labels=Dict.DictList String Position

-- MODEL
type alias Model =
    {
      points : Points
    , lines:Lines
    , labels:Labels
    , drag : Maybe Drag
    , mOver:Maybe Obj
    , input:String             
    , prompt:String             
    }


type alias Drag =
    {
      obj:Obj
    , start : Position
    , current : Position
    }


points: Points
points=Dict.empty
samplePoints=Dict.cons "B" (FP {x=20,y=-120}) (Dict.singleton "A" (FP {x=0,y=0}))
        |> (Dict.cons "C" (FP {x=60,y=120}))
        |> (Dict.cons "D" (POL "AB" 1 1))
        |> (Dict.cons "E" (POL "BC" 1 1))
        |> (Dict.cons "F" (POL "AC" 1 1))
        |> (Dict.cons "G" (FPOL "AC" {x=30,y=30}))
        |> (Dict.cons "I" (P2L "CD" "AE"))
        |> (Dict.cons "H" (P2L "CD" "BG"))           

lines:Lines
lines=Dict.empty
sampleLines=Dict.singleton "AB" (LineAB {a="A",b="B"})
     |> (Dict.cons "AC" (LineAB {a="A",b="C"}))
     |> Dict.cons "BC" (LineAB {a="C",b="B"})
     |> Dict.cons "CD" (LineAB {a="C",b="D"})
     |> Dict.cons "AE" (LineAB {a="A",b="E"})
     |> Dict.cons "BF" (LineAB {a="B",b="F"})
     |> Dict.cons "BG" (LineAB {a="B",b="G"})

labels:Labels
labels=Dict.empty
sampleLabels=Dict.singleton "A" ({x=4,y=4})
      |> Dict.cons "B" ({x=4,y=4})
      |> Dict.cons "C" ({x=4,y=4})
      |> Dict.cons "D" ({x=4,y=4})
      |> Dict.cons "E" ({x=4,y=4})
      |> Dict.cons "F" ({x=4,y=4})
      |> Dict.cons "G" ({x=4,y=4})         
                        
init : ( Model, Cmd Msg )
init =
    ( Model points lines labels Nothing Nothing "" "", Cmd.none )
                                
type Obj=P String | L String  | C String |Label String
getObjLabel:Obj->String
getObjLabel obj=
    case obj of
        P label->label
        L label->label
        C label->label
        Label label->label
                                
-- UPDATE

type Msg
    = DragStart Obj Position
    | DragAt Position
    | DragEnd Position
    | MOver Obj
    | MOut Obj
    | NoOp
    | Change String
    | Plot

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( updateHelp msg model, Cmd.none )
        
        
updateHelp : Msg -> Model -> Model
updateHelp msg model =
    case msg of
        DragStart obj xy ->
            {model|drag=(Just (Drag obj xy xy))}
        
        DragAt xy ->
            {model|drag= (Maybe.map (\{start,obj} -> Drag obj start xy) model.drag)}
                                                                        
        DragEnd _->
            {model|points=(getPoints model), labels=(getLabels model),drag=Nothing}
        MOver obj ->
            {model|mOver=Just obj}
        MOut obj ->
            {model|mOver=Nothing}
        Change input ->
            {model|input=input}
        Plot->
            plot model
        _->model                

plot:Model->Model
plot model=
    let input=model.input
        info=interpret model input               
    in
        {model|points=info.points,lines=info.lines,labels=info.labels,prompt=info.prompt}    
-- spaces:Parser ()
-- spaces=
--     ignore oneOrMore (\c->c==' ')

-- spaces0:Parser ()
-- spaces0=
--     ignore zeroOrMore (\c->c==' ')
        
-- constructFP:(List String)->Dict.DictList String (Position,Point)
-- constructFP labels=List.map
--                      (\label->(label,({x=4,y=4},FP {x=0,y=0})))
--                      labels
--                    |> Dict.fromList

-- variable:Parser String
-- variable=Parser.source <|
--           ignore oneOrMore (\c->Char.isUpper c||(Char.isLower c))
    
-- labelsParser:Parser (List String)
-- labelsParser=andThen (\v->labelsHelp [v]) variable

-- labelsHelp:List String->Parser (List String)
-- labelsHelp vs=
--     oneOf
--         [
--          nextVar
--              |> andThen (\v->labelsHelp (v::vs))
--         ,succeed (List.reverse vs)
--          ]
-- nextVar:Parser String
-- nextVar=delayedCommit spaces <|
--          succeed identity
--          |. symbol ","
--          |. spaces0
--          |= variable
        
-- pointParser:Parser (Dict.DictList String (Position,Point))
-- pointParser=oneOf
--              [
--               succeed constructFP
--                   |. keyword "free"
--                   |. spaces
--                   |. keyword "point"
--                   |. spaces
--                   |=labelsParser                  
--              ]

match:List String->R.Regex->(List (List String),List String)
match inputList re =
    let
        matches=List.map (\str->
                      let
                          match=R.find R.All re str
                          submatches=List.map .submatches match
                      in
                          (str,submatches|>List.concat |> List.map fromJust)
                         )
                 inputList

        info=List.filter (\(i,l)->
                              List.isEmpty l |> not
                              ) matches |> List.map Tuple.second
        res=List.filter (\(i,l)->
                              List.isEmpty l
                         ) matches |> List.map Tuple.first
    in (info,res)

(!!):List a->Int->a
(!!) l n=List.drop n l |> List.head |> fromJust

onePos:Int->Position
onePos m=
    let halfW=width//2
        halfH=height//2
        a=3
        b=30
        help n r=
            case n of
                0->r
                _->help (n-1) {x=(a*r.x+b)%width-halfW,y=(a*r.y+b)%height-halfH}
    in
        help m {x=0,y=0} |> truncatePos
    
constructP:Model->List String->List (String,Point)
constructP model input=
    let
        str=List.filter (\s->String.isEmpty s |> not) input        
        labels=String.map (\c->if c==',' then ' ' else c ) (str !! 0)
              |> String.words
        num=Dict.size model.points
        seq=List.range (num+1) ((List.length labels)+num)
    in
       case (List.length str) of
           1->List.map (\(l,n)->
                            let
                                p=if (Dict.member l model.points) then
                                        getPoint model l
                                  else FP (onePos n)
                            in
                                (l,p)
                       ) (List.map2 (,) labels seq)
           2->
               let s=str !! 1 |> String.words
               in
                  List.map (\(l,n)->
                                let pos=if (Dict.member l model.points) then
                                            (getP model l).pos
                                        else (onePos n)
                                in
                                    (l,FPOL (s !! 2) pos)
                           ) (List.map2 (,) labels seq)---modify
           _->let s=str !! 1 |> String.words
                  ratio=(str !! 2 |> String.words) !! 0 |> String.split ":"
                  a=ratio !! 0 |> String.toFloat |> Result.withDefault 0
                  b=ratio !! 1 |> String.toFloat |> Result.withDefault 0
              in
                List.map (\l->(l,POL (s !! 2) a b)) labels

constructLabel:Model->List (String,Point)->List (String,Position)
constructLabel model list=
    List.map (\(l,_)->let pos=if (Dict.member l model.labels) then
                              getLabelPos model l |> fromJust
                          else {x=4,y=4}
                  in
                      (l,pos)
             ) list
constructInterP:Model->List String->List (String,Point)
constructInterP model input
    =    let la=input !! 0
             lb=input !! 1
             label=input !! 2
         in [(label,P2L la lb)]
        
constructL:Model->List String->(String,Line)
constructL model input=
    let a=input !! 0
        b=input !! 1
    in
        (a++b,LineAB {a=a,b=b})

correctPL:Points->Lines->(Points,Lines)
correctPL points lines=
    let pcorrect=Dict.filter
                  (\label p->
                       case p of
                         POL llabel _ _->Dict.member llabel lines
                         FPOL llabel _->Dict.member llabel lines
                         P2L llabel1 llabel2->(Dict.member llabel1 lines)
                                              && (Dict.member llabel2 lines)
                         _->True                       
                  )
                  points
        lcorrect=Dict.filter
                  (\label l->
                     case l of
                         LineAB {a,b}->(Dict.member a points)
                                       &&(Dict.member b points)
                         _->True
                  )
                  lines
    in
        (pcorrect,lcorrect)
        
check:Points->Lines->String
check points lines=
    let pcheck=List.map
                (\p->
                     case p of
                         POL llabel _ _->if (Dict.member llabel lines) then ""
                                         else ("line "++llabel++" is not defined;\n")
                         FPOL llabel _->if (Dict.member llabel lines) then ""
                                         else ("line "++llabel++" is not defined;\n")
                         P2L llabel1 llabel2->(if (Dict.member llabel1 lines) then ""
                                              else ("line "++llabel1++" is not defined;\n")
                                              )++
                                              (if (Dict.member llabel2 lines) then ""
                                              else ("line "++llabel2++" is not defined;\n")
                                              )
                         _->""
                )
                (Dict.values points)
        lcheck=List.map
                (\l->
                     case l of
                         LineAB {a,b}->(if (Dict.member a points) then ""
                                       else ("point "++a++" is not defined;\n")
                                       )++
                                       (if (Dict.member b points) then ""
                                       else ("point "++b++" is not defined;\n")
                                       )
                         _->""
                )
                (Dict.values lines)
    in List.foldl (++) "" (List.append pcheck lcheck)
            
interpret:Model->String->{points:Points,lines:Lines,labels:Labels,prompt:String}
interpret model input=
    let
        inputList=String.lines input |>List.filter (\c-> String.isEmpty c|> not)
        re1=R.regex "^\\s*point\\s+(\\w+(?:\\s*,\\w+)*)((?:\\s+on\\s+\\w+\\s+\\w+)?)((?:\\s+[+-]?\\d+:[+-]?\\d+)?)\\s*$"
        (pointInfo1,res1)=match inputList re1
        points1=List.map (constructP model) pointInfo1

        re2=R.regex "^\\s*connect\\s+(\\w+)\\s+(\\w+)\\s*$"
        (lineInfo,res2)=match res1 re2
        lines=List.map (constructL model) lineInfo |>Dict.fromList

        re3=R.regex "^\\s*intersection\\s+of\\s+(\\w+)\\s+(\\w+)\\s+as\\s+point\\s+(\\w+)\\s*$"
        (pointInfo3,res3)=match res2 re3
        points2=List.map (constructInterP model) pointInfo3

        pointsList=List.append points1 points2 |> List.concat 
        points=pointsList|> Dict.fromList
        labels=constructLabel model pointsList |> Dict.fromList
        errors=List.foldl (\i str->
                               str++"can not understand: \""++ i ++"\";\n"
                          ) "" res3
        checks=check points lines
        prompt=errors++checks
    in
        if (String.isEmpty checks |> not) then
            let (p,l)=correctPL points lines
            in
                {points=p,lines=l,labels=labels,prompt=prompt}
        else
            {points=points,lines=lines,labels=labels,prompt=prompt}
--        {points=samplePoints,lines=sampleLines,labels=sampleLabels,prompt=prompt}

        
                                                                                
-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
    case model.drag of
        Nothing ->
            Sub.none
                
        Just drag ->
            Sub.batch [ Mouse.moves DragAt, Mouse.ups DragEnd ]
                                                                                                    

change:String->Msg
change input=Change input
                
-- VIEW
onMouseDown : Obj->Attribute Msg
onMouseDown obj=
    on "mousedown" (Decode.map (DragStart obj)  Mouse.position)

        
renderPoints:PList->List (S.Svg Msg)
renderPoints plist=
    List.map
    (\(label,{pos,labelPos,state})->
         S.g []
         (
         case labelPos of
            Just lpos->
              [
               S.circle [SA.cx (toString pos.x), SA.cy (toString pos.y),
                         SA.r (if state.dragging||state.labelDragging then "6" else "4"),
                         SA.fill (if state.dragging||state.labelDragging then "red" else "black"),
                         SA.cursor (if state.dragging then "move" else "default"),
                         onMouseDown (P label),
                         onMouseOver (MOver (P label)),
                         onMouseOut (MOut (P label))
                        ][]
              ,S.text_ [SA.x (pos.x+lpos.x |> toString), SA.y (-pos.y-lpos.y |>toString ),
                                        SA.cursor "move",
                                        SA.transform "scale(1,-1)",
                                        SA.fill (if state.dragging || state.labelDragging then "red" else "black"),
                                        onMouseDown (Label label)
                                       ] [S.text label]
              ]
            Nothing  -> []
         )
    )
    (Dict.toList plist)

renderLines:LList->List (S.Svg Msg)
renderLines llist=
    List.map
    (\(label,{twoPos,state})->
         S.g []
         [
          S.line [SA.style "stroke:black;stroke-width:3",
                  SA.x1 (toString twoPos.a.x), SA.y1 (toString twoPos.a.y),
                  SA.x2 (toString twoPos.b.x), SA.y2 (toString twoPos.b.y)
                 ][]
         ]
    )
    (Dict.toList llist)

width:Int
width=500
height:Int       
height=300
        
view : Model -> Html Msg
view model =
    div [onWithOptions "touchmove"
             {stopPropagation = True
             ,preventDefault = True}
             (Decode.succeed NoOp)
        ]
        [
         S.svg [SA.width (toString width), SA.height (toString height)]
             [S.g [SA.transform
                  ("translate("++(width//2 |> toString )++","++(height//2 |>toString)++") scale(1,-1)")]
                  ((renderPoints (getPList model))
                   ++(renderLines (getLList model))
                  )
             ]
        ,div[]
            [
             textarea [style
                        [("width","400px")
                        ,("height","200px")
                        ,("rows", "20")
                        ,("cols", "30")
                        ,("background-color","#595b5b")
                        ,("color","#fff")
                        ]
                      ,placeholder "input commands here"
                      ,onInput change
                      ][]
            ,button [onClick Plot] [text "plot"]
            ]
        ,div[style
                 [("color","red")
                  ,("white-space","pre-line")
                 ]
            ]
            [
             text model.prompt
            ]
           
        ]
    

translatePos:Position->Position->Position->Position
translatePos pos start current=
    let newPos=Position
                (pos.x + current.x - start.x)
                (pos.y - (current.y - start.y))--we have flip the y coordinate
    in
        truncatePos newPos

truncatePos:Position->Position
truncatePos pos=
    let    
        maxx=width//2-10
        maxy=height//2-10
        x=if( (abs pos.x)< maxx) then
              pos.x
          else
              if pos.x >0 then maxx else -maxx
        y=if( (abs pos.y)< maxy) then
              pos.y
          else
              if pos.y >0 then maxy else -maxy
    in
        {x=x,y=y}

minusPos:Position->Position->Position
minusPos pos1 pos2={x=pos1.x-pos2.x,y=pos1.y-pos2.y}
plusPos:Position->Position->Position
plusPos pos1 pos2={x=pos1.x+pos2.x,y=pos1.y+pos2.y}
scalePos:Float->Position->Position
scalePos scale pos={x=scale* (toFloat pos.x) |> round,y=scale*(toFloat pos.y) |> round}
    
            
footPoint:{a:Position,b:Position}->Position->Position
footPoint twoP pos=
    let vab=minusPos twoP.b twoP.a
        vap=minusPos pos twoP.a
        dot=vap.x*vab.x+vap.y*vab.y |> toFloat
        len=vab.x*vab.x+vab.y*vab.y |> toFloat
        scale=dot/len
    in
        plusPos twoP.a (scalePos scale vab)

intersection:{a:Position,b:Position}->{a:Position,b:Position}->Position
intersection twoPos1 twoPos2=
    let
        info=List.map
              (\twoPos->
                   let
                       x1=twoPos.a.x
                       y1=twoPos.a.y
                       x2=twoPos.b.x
                       y2=twoPos.b.y
                       d=x1*y2-x2*y1 |> toFloat
                       r=(toFloat (y2-y1)) /d
                       s=(toFloat (x1-x2)) /d                            
                   in
                       {r=r,s=s}
              )
              [twoPos1,twoPos2]
        l1=info|>List.head |> fromJust
        l2=info|> List.drop 1 |> List.head |> fromJust
        r1=l1.r
        s1=l1.s
        r2=l2.r
        s2=l2.s
        dd=r1*s2-s1*r2
        x=(s2-s1)/dd |> round
        y=(r1-r2)/dd |> round
    in {x=x,y=y}
        
        
getPoint:Model->PLabel->Point
getPoint model plabel=
    let point=Dict.get plabel model.points |> fromJust
    in
        case model.drag of
            Nothing ->point
            Just {obj,start,current} ->
                if (obj== (P plabel)) then
                    case point of
                        FP pos->FP (translatePos pos start current)
                        FPOL llabel pos ->
                            let
                                newPos=translatePos pos start current
                                actualPos=footPoint (getL model llabel |> .twoPos) newPos
                            in
                                FPOL llabel actualPos
                        _     -> point
                else
                    point
        
getPoints:Model->Points
getPoints model=Dict.map (\label pold ->getPoint model label) model.points
{-
    case model.drag of
        Nothing ->
            model.points
        Just {obj,start,current} ->
            case obj of
                P pLabel
                    ->Dict.update pLabel
                      (Maybe.map (\p->case p of
                                          FP pos->FP (translatePos pos start current)
                                          FPOL llabel pos ->FPOL llabel (translatePos pos start current)
                                          _     -> p
                                 )
                      )  model.points
                _   ->model.points
 -}

getLabels:Model->Labels
getLabels model=
    case model.drag of
        Nothing ->
            model.labels
        Just {obj,start,current} ->
            case obj of
                Label label
                    ->Dict.update label
                      (Maybe.map (\pos->translatePos pos start current) )
                      model.labels
                _  -> model.labels


getLines:Model->Lines
getLines model=model.lines


fromJust : Maybe a -> a
fromJust x = case x of
                 Just y -> y
                 Nothing -> Debug.crash "error: fromJust Nothing"

getP:Model->PLabel->Pinfo
getP model plabel=
    let point=getPoint model plabel
        obj=P plabel
        labelObj=Label plabel
        dragObj=Maybe.map .obj model.drag
    in
        case point of
            FP pos->
                {pos=pos,labelPos=(getLabelPos model plabel),
                 state={defaultSta|dragging=Just obj==model.mOver || Just obj==dragObj,
                        labelDragging=Just labelObj==dragObj
                       }
                }
            FPOL llabel pos->
                let actualPos=footPoint (getL model llabel |> .twoPos) pos
                in
                    {pos=actualPos,
                     labelPos=(getLabelPos model plabel),
                     state={defaultSta|dragging=Just obj==model.mOver|| Just obj==dragObj,
                            labelDragging=Just labelObj==dragObj                                
                           }
                    }                
            POL llabel f1 f2->
                let
                    linfo=getL model llabel
                    twoPos=linfo.twoPos
                    posa=twoPos.a
                    posb=twoPos.b
                    ratio=f1/(f1+f2)
                    vab=minusPos posb posa
                in
                    {pos=(plusPos posa (scalePos ratio vab)),
                     labelPos=getLabelPos model plabel,
                     state={defaultSta|dragging=False,
                            labelDragging=Just labelObj==dragObj
                           }
                    }
            P2L l1 l2->
                let
                    twoPos1=(getL model l1).twoPos
                    twoPos2=(getL model l2).twoPos
                in
                    {pos=(intersection twoPos1 twoPos2),
                     labelPos=getLabelPos model plabel,
                     state={defaultSta|dragging=False,
                            labelDragging=Just labelObj==dragObj          
                           }
                    }

getLabelPos:Model->String->Maybe Position
getLabelPos model label=
    let labels=getLabels model
    in
        Dict.get label labels
    
                

getL:Model->LLabel->Linfo
getL model llabel=
    let lines=getLines model
        line=Dict.get llabel lines |> fromJust
    in
        case line of
            Line2P twoPos->{twoPos=twoPos,state={defaultSta|dragging=False}}
            LineAB {a,b}->{
                    twoPos={a=getP model a |> .pos,b=getP model b |> .pos},
                    state={defaultSta|dragging=False}
                   }
        
getPList : Model->PList
getPList model=
    let
        points=getPoints model
    in
        Dict.map
        (\label point->getP model label
        )
        points
                                
getLList:Model->LList
getLList model=
    let 
        lines=getLines model
    in
        Dict.map
            (\label line->getL model label
            )
        lines                                                                                                                                           
