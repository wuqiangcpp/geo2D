import Browser
import Browser.Events as Event
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
-- exposing (on,onWithOptions,onMouseOver,onMouseOut,onInput,onClick)
import Json.Decode as D
import Json.Encode as E
import List as List
import Dict as Dict
import Svg as S
import Svg.Attributes as SA
import Debug exposing (toString)
import Html.Events.Extra.Pointer as Pointer
import Html.Events.Extra.Mouse as Mouse
import Parser exposing (..)


                
main =Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias PLabel=String
type alias LLabel=String
type alias CLabel=String    


--free point(FP), point on line (POL), free POL(FPOL), two line intersection(P2L)
type Point =FP Position | POL LLabel Float Float | FPOL LLabel Position
           | P2L LLabel LLabel| POLP PLabel LLabel
           | P2C CLabel CLabel Bool| PCL CLabel LLabel Bool|FPOC CLabel Position

--POC
type alias Points=Dict.Dict String Point


type alias Position={x:Float,y:Float}
type Line= LineAB {a:PLabel,b:PLabel}
type alias Lines=Dict.Dict LLabel Line

type Circle=Cir2 {a:PLabel,b:LLabel} | Cir3 {a:PLabel,b:PLabel,c:PLabel}
type alias Circles=Dict.Dict CLabel Circle
    
type alias State={dragging:Bool,labelDragging:Bool}
defaultSta:State
defaultSta={dragging=False,labelDragging=False}

type alias Pstate={hidden:Bool}
defaultPSta:Pstate
defaultPSta={hidden=False}
             
type alias Lstate={hidden:Bool,dashed:Bool}
defaultLSta:Lstate
defaultLSta={hidden=False,dashed=False}

type alias Pstates=Dict.Dict PLabel Pstate
type alias Lstates=Dict.Dict LLabel Lstate

--(point position,label position,state)     
type alias Pinfo={pos:Position,labelPos:(Maybe Position),state:State,extraState:Maybe Pstate}
type alias PList=Dict.Dict PLabel Pinfo
type alias Linfo={twoPos:{a:Position,b:Position},extraState:Maybe Lstate}
type alias LList=Dict.Dict LLabel Linfo
type alias Labels=Dict.Dict String Position
type alias Cinfo={center:Position,radius:Float}
type alias CList=Dict.Dict CLabel Cinfo

-- MODEL
type alias Model =
    {
     width:Float
    ,height:Float
    , points : Points
    , lines:Lines
    , labels:Labels
    , circles:Circles
    , pstates:Pstates
    , lstates:Lstates
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


initpoints: Points
initpoints=Dict.empty
samplePoints=Dict.insert "B" (FP {x=20,y=-120}) (Dict.singleton "A" (FP {x=0,y=0}))
        |> (Dict.insert "C" (FP {x=60,y=120}))
        |> (Dict.insert "D" (POL "AB" 1 1))
        |> (Dict.insert "E" (POL "BC" 1 1))
        |> (Dict.insert "F" (POL "AC" 1 1))
        |> (Dict.insert "G" (FPOL "AC" {x=30,y=30}))
        |> (Dict.insert "I" (P2L "CD" "AE"))
        |> (Dict.insert "H" (P2L "CD" "BG"))           

initlines:Lines
initlines=Dict.empty
sampleLines=Dict.singleton "AB" (LineAB {a="A",b="B"})
     |> (Dict.insert "AC" (LineAB {a="A",b="C"}))
     |> Dict.insert "BC" (LineAB {a="C",b="B"})
     |> Dict.insert "CD" (LineAB {a="C",b="D"})
     |> Dict.insert "AE" (LineAB {a="A",b="E"})
     |> Dict.insert "BF" (LineAB {a="B",b="F"})
     |> Dict.insert "BG" (LineAB {a="B",b="G"})
initcircles=Dict.empty
sampleCircles=Dict.singleton "AB" (Cir2 {a="A",b="AB"})
             |> Dict.insert "ABC" (Cir3 {a="A",b="B",c="C"})               
    
initlabels:Labels
initlabels=Dict.empty
sampleLabels=Dict.singleton "A" ({x=4,y=4})
      |> Dict.insert "B" ({x=4,y=4})
      |> Dict.insert "C" ({x=4,y=4})
      |> Dict.insert "D" ({x=4,y=4})
      |> Dict.insert "E" ({x=4,y=4})
      |> Dict.insert "F" ({x=4,y=4})
      |> Dict.insert "G" ({x=4,y=4})

initpstates=Dict.empty
initlstates=Dict.empty         
                        
init :{width:Float,height:Float,input:String,objsStr:String}->( Model, Cmd Msg )
--init _=
--    ( Model initpoints initlines initlabels initcircles initpstates initlstates Nothing Nothing "" "", Cmd.none )
init {width,height,input,objsStr}=
    let
        objs=interpret0 objsStr
    in
        (Model width height objs.points objs.lines objs.labels objs.circles objs.pstates objs.lstates Nothing Nothing input "",Cmd.none)


interpret0:String->Objs
interpret0 objsStr=
    let
        result=D.decodeString decodeObjs objsStr
    in
        case result of
            Ok objs->objs
            Err error->{emptyObjs|prompt="error"}

                                
type Obj=P String |Label String
getObjLabel:Obj->String
getObjLabel obj=
    case obj of
        P label->label
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
    | Export

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
        Export->
            let
                objs={points=model.points,lines=model.lines,circles=model.circles
                     ,labels=model.labels,pstates=model.pstates,lstates=model.lstates
                     ,prompt=""}
            in
                {model|prompt="'"++(String.join "\\n" (String.lines model.input))
                     ++"','"
                     ++(E.encode 0 (encodeObjs objs))++"'"
                }
        _->model

plot:Model->Model
plot model=
    let input=model.input
        info=interpret model input               
    in
        {model|points=info.points,lines=info.lines,circles=info.circles
        ,labels=info.labels,prompt=info.prompt
        ,pstates=info.pstates,lstates=info.lstates
        }

    

type alias Objs={points:Points,lines:Lines,circles:Circles,labels:Labels
                ,prompt:String,pstates:Pstates,lstates:Lstates}
emptyObjs={points=Dict.empty,lines=Dict.empty,circles=Dict.empty,
               labels=Dict.empty,prompt="",pstates=Dict.empty,lstates=Dict.empty}
sampleObjs={points=samplePoints,lines=sampleLines,circles=Dict.empty
           ,labels=sampleLabels,prompt=""
           ,pstates=Dict.empty,lstates=Dict.empty}

decodePosition:D.Decoder Position
decodePosition=D.map2 (\x y->{x=x,y=y})
                      (D.field "x" D.float)
                      (D.field "y" D.float)
decodePoint:D.Decoder Point
decodePoint=D.field "type" D.string
              |> D.andThen (\t->case t of
                                "FP"->D.map FP (D.field "position" decodePosition)
                                "POL"->D.map3 POL (D.field "llabel" D.string)
                                                   (D.field "a" D.float)
                                                   (D.field "b" D.float)
                                "FPOL"->D.map2 FPOL
                                                 (D.field "llabel" D.string)
                                                 (D.field "position" decodePosition)
                                "P2L"->D.map2 P2L
                                               (D.field "llabel1" D.string)
                                               (D.field "llabel2" D.string)
                                "POLP"->D.map2 POLP
                                               (D.field "plabel" D.string)
                                               (D.field "llabel" D.string)
                                "P2C"->D.map3 P2C
                                               (D.field "clabel1" D.string)
                                               (D.field "clabel2" D.string)
                                               (D.field "isPositive" D.bool)
                                "PCL"->D.map3 PCL
                                               (D.field "clabel" D.string)
                                               (D.field "llabel" D.string)
                                               (D.field "isPositive" D.bool)
                                "FPOC"->D.map2 FPOC
                                               (D.field "clabel" D.string)
                                               (D.field "position" decodePosition)
                                _->D.fail "error in point"
                           )
decodeLine:D.Decoder Line
decodeLine=D.field "type" D.string
            |>D.andThen (\t->case t of
                             "LineAB"->D.map2 (\a b->LineAB {a=a,b=b})
                                              (D.field "plabel1" D.string)
                                              (D.field "plabel2" D.string)
                             _->D.fail "error in line"
                        )
decodeCircle:D.Decoder Circle
decodeCircle=D.field "type" D.string
            |>D.andThen (\t->case t of
                             "Cir2"->D.map2 (\a b->Cir2 {a=a,b=b})
                                              (D.field "plabel" D.string)
                                              (D.field "llabel" D.string)
                             "Cir3"->D.map3 (\a b c->Cir3 {a=a,b=b,c=c})
                                              (D.field "plabel1" D.string)
                                              (D.field "plabel2" D.string)
                                              (D.field "plabel3" D.string)
                             _->D.fail "error in circle"
                        )
              
decodePstate:D.Decoder Pstate
decodePstate=D.map (\h->{hidden=h}) (D.field "hidden" D.bool)
decodeLstate:D.Decoder Lstate
decodeLstate=D.map2 (\h d->{hidden=h,dashed=d})
                (D.field "hidden" D.bool)
                (D.field "dashed" D.bool)
decodeObjs:D.Decoder Objs
decodeObjs=D.map6 (\ps ls cs las pss lss->
                    {points=ps,lines=ls,circles=cs,labels=las
                    ,pstates=pss,lstates=lss,prompt=""}
                  )
                  (D.field "points" (D.dict decodePoint))
                  (D.field "lines" (D.dict decodeLine))
                  (D.field "circles" (D.dict decodeCircle))                      
                  (D.field "labels" (D.dict decodePosition))
                  (D.field "pstates" (D.dict decodePstate))
                  (D.field "lstates" (D.dict decodeLstate))


encodePosition:Position->E.Value
encodePosition pos=E.object [("x",E.float pos.x),("y",E.float pos.y)]
encodePoint:Point->E.Value
encodePoint point=case point of
                      FP pos->E.object [("type",E.string "FP")
                                       ,("position",encodePosition pos)]
                      POL ll a b->E.object [("type",E.string "POL")
                                           ,("llabel",E.string ll)
                                           ,("a",E.float a)
                                           ,("b",E.float b)
                                           ]
                      FPOL ll pos->E.object [("type",E.string "FPOL")
                                            ,("llabel",E.string ll)
                                            ,("position",encodePosition pos)
                                            ]
                      P2L ll1 ll2->E.object [("type",E.string "P2L")
                                            ,("llabel1",E.string ll1)
                                            ,("llabel2",E.string ll2)
                                            ]
                      POLP pl ll->E.object [("type",E.string "POLP")
                                            ,("plabel",E.string pl)
                                            ,("llabel",E.string ll)
                                            ]
                      P2C c1 c2 isPositive->E.object [("type",E.string "P2C")
                                                     ,("clabel1",E.string c1)
                                                     ,("clabel2",E.string c2)
                                                     ,("isPositive",E.bool isPositive)
                                                     ]
                      PCL c l isPositive->E.object [("type",E.string "PCL")
                                                     ,("clabel",E.string c)
                                                     ,("llabel",E.string l)
                                                     ,("isPositive",E.bool isPositive)
                                                   ]
                      FPOC clabel position->E.object [("type",E.string "FPOC")
                                           ,("clabel",E.string clabel)
                                           ,("position",encodePosition position)
                                           ]
encodeLine:Line->E.Value
encodeLine (LineAB twoP)=E.object [("type",E.string "LineAB")
                                          ,("plabel1",E.string twoP.a)
                                          ,("plabel2",E.string twoP.b)
                                          ]

encodeCircle:Circle->E.Value
encodeCircle circle=
    case circle of
        Cir2 pl->E.object [("type",E.string "Cir2")
                             ,("plabel",E.string pl.a)
                             ,("llabel",E.string pl.b)
                              ]
        Cir3 threeP->E.object [("type",E.string "Cir3")
                                ,("plabel1",E.string threeP.a)
                                ,("plabel2",E.string threeP.b)
                                ,("plabel3",E.string threeP.c)            
                                ]        
                          
encodePstate:Pstate->E.Value
encodePstate pstate=E.object [("hidden",E.bool pstate.hidden)]
encodeLstate:Lstate->E.Value
encodeLstate lstate=E.object [("hidden",E.bool lstate.hidden)
                             ,("dashed",E.bool lstate.dashed)
                             ]

encodeObjs:Objs->E.Value
encodeObjs objs=E.object
                  [ ("points",E.object (Dict.map (\name point->encodePoint point)
                                                 objs.points |> Dict.toList)
                    )
                   ,("lines",E.object (Dict.map (\name line->encodeLine line)
                                                 objs.lines |> Dict.toList))
                   ,("circles",E.object (Dict.map (\name circle->encodeCircle circle)
                                                 objs.circles |> Dict.toList))
                   ,("labels",E.object (Dict.map (\name pos->encodePosition pos)
                                                 objs.labels |> Dict.toList))
                   ,("pstates",E.object (Dict.map (\name pstate->encodePstate pstate)
                                                 objs.pstates |> Dict.toList))
                   ,("lstates",E.object (Dict.map (\name lstate->encodeLstate lstate)
                                                 objs.lstates |> Dict.toList))
                  ]

mergePstate:Pstate->Maybe Pstate->Pstate
mergePstate ps1 s=case s of
                        Nothing->ps1
                        (Just ps2)->{defaultPSta|hidden=ps1.hidden||ps2.hidden}
--if collion, preference is given to first arg
mergePstates:Pstates->Pstates->Pstates
mergePstates ps1 ps2=Dict.foldl
    (\c v d->
         let vv=mergePstate v (Dict.get c d)
         in
             Dict.insert c vv d
    )
    ps2 ps1
mergeLstate:Lstate->Maybe Lstate->Lstate
mergeLstate s1 s=case s of
                     Nothing->s1
                     (Just s2)->{defaultLSta|hidden=s1.hidden||s2.hidden
                                ,dashed=s1.dashed||s2.dashed}
mergeLstates:Lstates->Lstates->Lstates
mergeLstates s1 s2=Dict.foldl
    (\c v d->
         let vv=mergeLstate v (Dict.get c d)
         in
             Dict.insert c vv d
    )
    s2 s1

    
addObjs:Objs->Objs->Objs
addObjs objsAdded objs={objs|points=Dict.union objsAdded.points objs.points
                            ,lines=Dict.union objsAdded.lines objs.lines
                            ,circles=Dict.union objsAdded.circles objs.circles
                            ,pstates=mergePstates objsAdded.pstates objs.pstates
                            ,lstates=mergeLstates objsAdded.lstates objs.lstates
                            ,prompt= if (String.isEmpty objsAdded.prompt)
                                     then objs.prompt
                                     else  objs.prompt++"\n"++objsAdded.prompt
                       }


pointLabelName:Parser String
pointLabelName=chompIf Char.isAlpha |> getChompedString
          |>andThen (\s-> if (String.isEmpty s) then problem "Expecting a name "
                          else succeed s
                     )
lineLabelName:Parser String
lineLabelName=succeed (\p1 p2->lineNameFrom2P p1 p2)
               |=pointLabelName
               |=pointLabelName
circleLabelName:Parser String
circleLabelName=succeed (\a b->"circle:"++a++b)
                  |=pointLabelName
                  |=oneOf
                   [
                    succeed (\a b->a++b)
                        |=pointLabelName                        
                        |=pointLabelName
                   ,succeed (\c->":"++c)
                        |.symbol ":"
                        |=lineLabelName
                   ]
pointLabelNames:Parser (List String)
pointLabelNames=sequence
             { start=""
              ,separator=","
              ,end=""
              ,spaces=spaces
              ,item=pointLabelName
              ,trailing=Forbidden
             }
lineLabelNames:Parser (List String)
lineLabelNames=sequence
             { start=""
              ,separator=","
              ,end=""
              ,spaces=spaces
              ,item=lineLabelName
              ,trailing=Forbidden
             }
circleLabelNames:Parser (List String)
circleLabelNames=sequence
             { start=""
              ,separator=","
              ,end=""
              ,spaces=spaces
              ,item=circleLabelName
              ,trailing=Forbidden
             }

nameToPosition:Model->String->Position
nameToPosition model s=if (Dict.member s model.points)
                       then let p=getP model s
                            in p.pos
                       else
                           let w=model.width-10
                               h=model.height-10
                           in
                               String.toList s |> List.map Char.toCode |>List.sum
                                         |>(\d->{x=toFloat ((modBy 13 d)*47
                                                           |>modBy (round w))-w/2
                                                ,y=toFloat ((modBy 19 d)*61
                                                           |>modBy (round h))-h/2
                                                }
                              )
lineNameFrom2P:PLabel->PLabel->LLabel
lineNameFrom2P p1 p2=if (p1<p2) then (p1++p2) else (p2++p1)
lineNameToLine:LLabel->Maybe Line
lineNameToLine l=
    case (String.length l) of
        2->let p1=String.slice 0 1 l
               p2=String.slice 1 2 l
           in
               Just (LineAB {a=p1,b=p2})
        _->Nothing


circleNameToCircle:CLabel->Maybe Circle
circleNameToCircle clabel=
    case (String.length clabel) of
        11->let a=String.slice 7 8 clabel
                b=String.slice 9 11 clabel
            in
                Just (Cir2 {a=a,b=b})
        10->let a=String.slice 7 8 clabel
                b=String.slice 8 9 clabel
                c=String.slice 9 10 clabel
            in
                Just (Cir3 {a=a,b=b,c=c})
        _->Nothing
    
newPoints:Model->List String->String->LLabel->Float->Float->Points
newPoints model ns t label a b=List.map
                         (\s->
                              let
                                  pos=(nameToPosition model s)
                              in
                                  if (String.isEmpty label)
                                  then (s,FP pos)
                                  else if (t=="line")
                                       then if(a==0 && b==0)
                                            then
                                                 (s,FPOL label pos)
                                            else (s,POL label a b)
                                       else
                                           (s,FPOC label pos)
                         ) ns
                        |> Dict.fromList

statement:Model->Parser Objs
statement model=succeed (identity)
            |.spaces
            |=oneOf [succeed (\ns (t,label,(a,b))->{emptyObjs|
                                           points=((newPoints model) ns t label a b)
                                                  }
                             )
                     |. keyword "point"
                     |. spaces
                     |=pointLabelNames
                     |. spaces
                     |=oneOf [succeed (identity)
                                      |. keyword "on"
                                      |. spaces
                                      |=oneOf
                                        [succeed
                                             (\llabel ratio->("line",llabel,ratio))
                                        |. keyword "line"
                                        |. spaces
                                        |=lineLabelName
                                        |.spaces
                                        |=oneOf [succeed (\a b->(a,b))
                                                |=float
                                                |.symbol ":"
                                                |=float
                                                |.spaces
                                                |.end
                                                ,succeed (\_->(0,0))
                                                |=end
                                                ]
                                        ,succeed (\clabel->("circle",clabel,(0,0)))
                                            |. keyword "circle"
                                            |. spaces
                                            |=circleLabelName
                                            |.spaces
                                            |.end
                                        ]
                             ,succeed (\_->("","",(0,0)))
                                 |=end
                             ]
                ,succeed (\lls t->{emptyObjs|
                                     lines=List.map
                                           (\ll->(ll,lineNameToLine ll|>fromJust))
                                           lls |> Dict.fromList
                                    ,lstates=List.map
                                           (\ll->(ll,{defaultLSta|dashed=t}))
                                           lls |> Dict.fromList
                                  }
                         )
                     |. keyword "connect"
                     |. spaces
                     |=lineLabelNames
                     |. spaces
                     |=oneOf
                         [
                          succeed (\_->True)
                              |.keyword "dashed"
                              |.spaces
                              |=end
                         ,succeed (\_->False)
                              |=end
                         ]
                ,succeed (\(t1,s1) (t2,s2) isPositive pn->
                              case (t1,t2) of
                                  ("line","line")->{emptyObjs|points=
                                                        Dict.singleton pn (P2L s1 s2)
                                                   }
                                  ("line","circle")->{emptyObjs|points=
                                                        Dict.singleton pn
                                                          (PCL s2 s1 isPositive)
                                                 }
                                  ("circle","line")->{emptyObjs|points=
                                                        Dict.singleton pn
                                                          (PCL s1 s2 isPositive)
                                                 }
                                  ("circle","circle")->{emptyObjs|points=
                                                        Dict.singleton pn
                                                          (P2C s1 s2 isPositive)
                                                 }
                                  _->emptyObjs
                         )
                     |.keyword "intersection"
                     |.spaces
                     |.keyword "of"
                     |.spaces
                     |=oneOf
                       [succeed (\s->("line",s))
                         |.keyword "line"
                         |.spaces
                         |=lineLabelName
                       ,succeed (\s->("circle",s))
                         |.keyword "circle"
                         |.spaces
                         |=circleLabelName
                       ]
                     |.spaces
                     |=oneOf
                       [succeed (\s->("line",s))
                         |.keyword "line"
                         |.spaces
                         |=lineLabelName
                       ,succeed (\s->("circle",s))
                         |.keyword "circle"
                         |.spaces
                         |=circleLabelName
                       ]
                     |.spaces
                     |=oneOf
                       [succeed (\_->True)
                            |=symbol "+"
                       ,succeed (\_->False)
                            |=symbol "-"
                       ,succeed True
                       ]
                     |.spaces
                     |.keyword "as"
                     |.spaces
                     |.keyword "point"
                     |.spaces
                     |=pointLabelName
                     |.spaces
                     |.end
                ,succeed (\pl ll pn->{emptyObjs|points=
                                                 Dict.singleton pn
                                                    (POLP pl ll)})
                     |.keyword "projection"
                     |.spaces
                     |.keyword "of"
                     |.spaces
                     |=pointLabelName
                     |.spaces                       
                     |.keyword "on"
                     |.spaces                       
                     |=lineLabelName
                     |.spaces
                     |.keyword "as"
                     |.spaces
                     |.keyword "point"
                     |.spaces                       
                     |=pointLabelName                       
                     |.spaces
                     |.end                       
                ,succeed (\(t,ns)->case t of
                                      "point"->{emptyObjs|pstates=List.map
                                                   (\s->(s,{defaultPSta|hidden=True}))
                                                    ns
                                                 |>Dict.fromList
                                               }
                                      "line"->{emptyObjs|lstates=List.map
                                                   (\s->(s,{defaultLSta|hidden=True}))
                                                    ns
                                                 |>Dict.fromList
                                              }
                                      _   ->emptyObjs
                         )
                     |.keyword "hide"
                     |.spaces
                     |=oneOf
                       [ succeed (\ns->("point",ns))
                             |.keyword "point"
                             |.spaces
                             |=pointLabelNames
                        ,succeed (\ns->("line",ns))
                             |.keyword "line"
                             |.spaces
                             |=lineLabelNames                           
                       ]
                     |.spaces
                     |.end
                ,succeed (\cs->{emptyObjs|circles=
                                    List.map (\c->(c,circleNameToCircle c |>fromJust))
                                    cs |> Dict.fromList
                               }
                         )
                     |.keyword "circle"
                     |.spaces
                     |=circleLabelNames
                     |.spaces
                     |.end
                ,succeed (\_->emptyObjs)
                     |=end
                ,problem ("Cannot understand ")
                ]


showError:List DeadEnd->String
showError ds=List.map
              (\dead->case dead.problem of
                            Problem ps->ps
                            _->"Error when parsing "
              )
              ds
              |>List.reverse |> List.take 1 |> String.join ""
interpret:Model->String
         ->Objs
--interpret model input={emptyObjs|points=samplePoints,lines=sampleLines
--                      ,labels=sampleLabels,circles=sampleCircles}
--interpret model input=interpret0 input
interpret model input=let inputLines=String.lines input
                          len=List.length inputLines
                          numL=List.range 1 len 
                       in
                          List.map2
                               (\n s->case (run (statement model) s) of
                                Ok objs->objs
                                Err errInfo->
                                  {emptyObjs|prompt=
                                       ("Line "++(toString n)++": "
                                            ++showError errInfo ++ "\""++s++"\"")}
                               ) numL inputLines
                          |> collectAndCheck model
                                      
collectAndCheck:Model->List Objs->Objs
collectAndCheck model objsList=let objs=List.foldl addObjs emptyObjs objsList
                         in
                             {objs|labels=Dict.map (\s p->
                                                    if (Dict.member s model.labels) then
                                                        getLabelPos model s |> fromJust
                                                    else
                                                        {x=4,y=4}
                                                   ) objs.points} 
        
                                                                                
-- SUBSCRIPTIONS
mousePosition:D.Decoder Position
mousePosition=let x=D.field "pageX" D.int
                  y=D.field "pageY" D.int
              in
                 D.map2 (\a b->{x=toFloat a,y=toFloat b}) x y

subscriptions : Model -> Sub Msg
subscriptions model =
    case model.drag of
        Nothing ->
            Sub.none
                
        Just drag ->
            Sub.batch [ Event.onMouseMove (D.map DragAt mousePosition), Event.onMouseUp (D.map DragEnd mousePosition) ]
                                                                                                    

change:String->Msg
change input=Change input
                
-- VIEW
onMouseDown : Obj->Attribute Msg
--onMouseDown obj=Pointer.onDown (\event->(let (x,y)=event.pointer.offsetPos
--                                         in
--                                              DragStart obj {x=x,y=y}))
onMouseDown obj=Mouse.onDown (\event->(let (x,y)=event.clientPos
                                         in
                                              DragStart obj {x=x,y=y}))

        
renderPoints:PList->List (S.Svg Msg)
renderPoints plist=
    List.map
    (\(label,{pos,labelPos,state,extraState})->
         S.g []
         (
          let hidden=
               case extraState of
                   Just es->es.hidden
                   Nothing->False
          in
            case labelPos of
             Just lpos->
              if (not hidden)
              then
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
              else
                  []
             Nothing  -> []
         )
    )
    (Dict.toList plist)

renderLines:LList->List (S.Svg Msg)
renderLines llist=
    List.map
    (\(label,{twoPos,extraState})->
          let (dashed,hidden)=
               case extraState of
                  Just es->(es.dashed,es.hidden)
                  Nothing->(False,False)
          in
              S.g []
         (
          if (not hidden)
          then
              [
               S.line [SA.style ("stroke:black;stroke-width:3;"
                                 ++if dashed then "stroke-dasharray:10,6" else ""),
                  SA.x1 (toString twoPos.a.x), SA.y1 (toString twoPos.a.y),
                  SA.x2 (toString twoPos.b.x), SA.y2 (toString twoPos.b.y)
                 ][]
              ]
          else
              []
         )
    )
    (Dict.toList llist)

renderCircles:CList->List (S.Svg Msg)
renderCircles clist=
    List.map
    (\(label,{center,radius})->
              S.g []
              [
               S.circle [SA.style "stroke:black;stroke-width:3;"
                        ,SA.cx (toString center.x),SA.cy (toString center.y)
                        ,SA.r (toString radius)
                        ,SA.fill "none"
                 ][]
              ]
    )
    (Dict.toList clist)


    
        
view : Model -> Html Msg
view model =
    div [
--    onWithOptions "touchmove"
--             {stopPropagation = True
--             ,preventDefault = True}
--             (D.succeed NoOp)
        style "touch-action" "none"
        ]
        [
         S.svg [SA.width (toString model.width), SA.height (toString model.height)]
             [S.g [SA.transform
                  ("translate("++(model.width/2 |> toString )++","++(model.height/2 |>toString)++") scale(1,-1)")]
                  ((renderPoints (getPList model))
                   ++(renderLines (getLList model))
                   ++(renderCircles (getCList model))                       
                  )
             ]
        ]

examples=List.map text [
                       "point A,B,C\n"
                       ,"connect AB,BC,AC\n"
                       ,"point D on line AB\n"
                       ,"point E on line BC 1:1\n"
                       ,"point F on circle ABC\n"
                       ,"connect AE dashed\n"
                       ,"connect CD\n"
                       ,"intersection of line AE line CD as point I\n"
                       ,"intersection of line AE circle ACD as point I\n"
                       ,"intersection of circle ABE circle ACD + as point I\n"
                       ,"intersection of circle ABE circle ACD - as point I\n"
                       ,"circle ABC\n"
                       ,"circle I:IA\n"                           
                       ,"projection of D on CB as point P\n"
                       ,"hide point I\n"
                       ,"hide line CD\n"
                       ]
        
translatePos:Model->Position->Position->Position->Position
translatePos model pos start current=
    let newPos=Position
                (pos.x + current.x - start.x)
                (pos.y - (current.y - start.y))--we have flip the y coordinate
    in
        truncatePos model newPos

truncatePos:Model->Position->Position
truncatePos model pos=
    let    
        maxx=model.width/2-10
        maxy=model.height/2-10
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
scalePos scale pos={x=scale* pos.x,y=scale* pos.y }
    
            
footPoint:{a:Position,b:Position}->Position->Position
footPoint twoP pos=
    let vab=minusPos twoP.b twoP.a
        vap=minusPos pos twoP.a
        dot=vap.x*vab.x+vap.y*vab.y
        len=vab.x*vab.x+vab.y*vab.y
        scale=dot/len
    in
        plusPos twoP.a (scalePos scale vab)

circle3P:Position->Position->Position->{center:Position,radius:Float}
circle3P a b c=
    let
        twoPosab={a=a,b=b}
        twoPosac={a=a,b=c}
        midperab=midperpend twoPosab
        midperac=midperpend twoPosac
        center=intersectionL midperab midperac
        dr=minusPos a center
        radius=sqrt(dr.x*dr.x+dr.y*dr.y)
    in
        {center=center,radius=radius}

midperpend:{a:Position,b:Position}->{a:Position,b:Position}
midperpend twoPos=
    let
        center=scalePos 0.5 (plusPos twoPos.a twoPos.b)
        dir=minusPos twoPos.a twoPos.b
        perdir={x=-dir.y,y=dir.x}
        perPos=plusPos center perdir
    in
        {a=center,b=perPos}


intersectionC:Cinfo->Cinfo->Bool->Position
intersectionC c1 c2 isPositive=
    let
        c1o=c1.center
        c2o=c2.center
        c1r=c1.radius
        c2r=c2.radius
        a=c1o.x-c2o.x
        b=c1o.y-c2o.y
        c=(c2r*c2r-c1r*c1r+c1o.x*c1o.x+c1o.y*c1o.y-c2o.x*c2o.x-c2o.y*c2o.y)/2
        l={a=a,b=b,c=c}
    in
        intersectionCL c1 l isPositive
            
intersectionCL:Cinfo->{a:Float,b:Float,c:Float}->Bool->Position
intersectionCL cinfo l isPositive=
    let
        o=cinfo.center
        r=cinfo.radius
        a=l.a
        b=l.b
        c=l.c
        aa=a*a*o.y+b*c-a*b*o.x
        d=sqrt((a*b*o.x-b*c-a*a*o.y)^2-
                   (a^2+b^2)*(c^2-2*a*c*o.x+a^2*(o.x^2+o.y^2-r^2)))
        y=if isPositive
          then (aa+d)/(a^2+b^2)
          else (aa-d)/(a^2+b^2)
        x=(c-b*y)/a
    in
        {x=x,y=y}
        
twoPointLine:{a:Position,b:Position}->{a:Float,b:Float,c:Float}
twoPointLine twoPos=
    let
        x1=twoPos.a.x
        y1=twoPos.a.y
        x2=twoPos.b.x
        y2=twoPos.b.y
        d=x1*y2-x2*y1
        r=y2-y1
        s=x1-x2
    in
        {a=r,b=s,c=d}

intersectionL:{a:Position,b:Position}->{a:Position,b:Position}->Position
intersectionL twoPos1 twoPos2=
    let
        l1=twoPointLine twoPos1
        l2=twoPointLine twoPos2
        r1=l1.a
        s1=l1.b
        d1=l1.c
        r2=l2.a
        s2=l2.b
        d2=l2.c
        dd=r1*s2-s1*r2
        x=(d1*s2-d2*s1)/dd
        y=(r1*d2-r2*d1)/dd
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
                        FP pos->FP (translatePos model pos start current)
                        FPOL llabel pos ->
                            let
                                newPos=translatePos model pos start current
                                actualPos=footPoint (getL model llabel |> .twoPos) newPos
                            in
                                FPOL llabel actualPos
                        FPOC clabel pos->
                            let
                                newPos=translatePos model pos start current
                                c=(getC model clabel)
                                center=c.center
                                r=c.radius
                                d=minusPos newPos center
                                angle=atan2 d.y d.x
                                actualPos=plusPos center
                                           {x=r*cos(angle),y=r*sin(angle)}
                            in
                                FPOC clabel actualPos
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
                                          FP pos->FP (translatePos model pos start current)
                                          FPOL llabel pos ->FPOL llabel (translatePos model pos start current)
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
                      (Maybe.map (\pos->translatePos model pos start current) )
                      model.labels
                _  -> model.labels


getLines:Model->Lines
getLines model=model.lines

getCircles:Model->Circles
getCircles model=model.circles

fromJust : Maybe a -> a
fromJust x = case x of
                 Just y -> y
                 Nothing -> Debug.todo "error: fromJust Nothing"

getP:Model->PLabel->Pinfo
getP model plabel=
    let point=getPoint model plabel
        obj=P plabel
        labelObj=Label plabel
        dragObj=Maybe.map .obj model.drag
        extraSta=Dict.get plabel model.pstates
    in
        case point of
            FP pos->
                {pos=pos,labelPos=(getLabelPos model plabel),
                 state={defaultSta|dragging=Just obj==model.mOver || Just obj==dragObj,
                        labelDragging=Just labelObj==dragObj
                       }
                 ,extraState=extraSta
                }
            FPOL llabel pos->
                let
                    actualPos=footPoint (getL model llabel |> .twoPos) pos
                in
                    {pos=actualPos,
                     labelPos=(getLabelPos model plabel),
                     state={defaultSta|
                            dragging=Just obj==model.mOver|| Just obj==dragObj,
                            labelDragging=Just labelObj==dragObj
                           }
                    ,extraState=extraSta
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
                    ,extraState=extraSta                         
                    }
            P2L l1 l2->
                let
                    twoPos1=(getL model l1).twoPos
                    twoPos2=(getL model l2).twoPos
                in
                    {pos=(intersectionL twoPos1 twoPos2),
                     labelPos=getLabelPos model plabel,
                     state={defaultSta|dragging=False,
                            labelDragging=Just labelObj==dragObj          
                           }
                    ,extraState=extraSta                         
                    }
            POLP pl ll->
                let
                    pinfo=getP model pl
                    twoP=getL model ll
                in
                {pos=footPoint twoP.twoPos pinfo.pos,
                 labelPos=getLabelPos model plabel,
                 state={defaultSta|dragging=False,
                        labelDragging=Just labelObj==dragObj
                           }
                ,extraState=extraSta                         
                }
            P2C c1 c2 isPositive->
                let
                    c1info=getC model c1
                    c2info=getC model c2
                in
                {pos=intersectionC c1info c2info isPositive,
                 labelPos=getLabelPos model plabel,
                 state={defaultSta|dragging=False,
                        labelDragging=Just labelObj==dragObj
                           }
                ,extraState=extraSta                         
                }
            PCL c l isPositive->
                let
                    cinfo=getC model c
                    linfo=getL model l
                in
                {pos=intersectionCL cinfo (twoPointLine linfo.twoPos) isPositive,
                 labelPos=getLabelPos model plabel,
                 state={defaultSta|dragging=False,
                        labelDragging=Just labelObj==dragObj
                           }
                ,extraState=extraSta                         
                }
            FPOC clabel pos->
                let
                    c=(getC model clabel)
                    center=c.center
                    r=c.radius
                    d=minusPos pos center
                    angle=atan2 d.y d.x
                    actualPos=plusPos center
                               {x=r*cos(angle),y=r*sin(angle)}
                in
                    {pos=actualPos,
                     labelPos=(getLabelPos model plabel),
                     state={defaultSta|
                            dragging=Just obj==model.mOver|| Just obj==dragObj,
                            labelDragging=Just labelObj==dragObj
                           }
                    ,extraState=extraSta
                    }


getLabelPos:Model->String->Maybe Position
getLabelPos model label=
    let labels=getLabels model
    in
        Dict.get label labels
    
                

getL:Model->LLabel->Linfo
getL model llabel=
    let lines=getLines model
        line=if (Dict.member llabel lines)
             then Dict.get llabel lines
             else
                 lineNameToLine llabel
        state=Dict.get llabel model.lstates
    in
        case line of
            Just (LineAB {a,b})->{
                    twoPos={a=getP model a |> .pos,b=getP model b |> .pos},
                    extraState=state
                   }
            Nothing->{twoPos={a={x=0,y=0},b={x=0,y=0}}
                     ,extraState=Nothing}--this will never happen

getC:Model->CLabel->Cinfo
getC model clabel=
    let
        circles=getCircles model
        circle=if (Dict.member clabel circles)
               then Dict.get clabel circles
               else
                   circleNameToCircle clabel
    in
        case circle of
            Just (Cir2 {a,b})->
                let
                    infoa=getP model a
                    infob=getL model b
                    posa=infoa.pos
                    posb=infob.twoPos
                    cpos=posa
                    dpos=minusPos posb.a posb.b
                    r=sqrt(dpos.x*dpos.x+dpos.y*dpos.y)
                in
                    {center=cpos,radius=r}
            Just (Cir3 {a,b,c})->
                let
                    infoa=getP model a
                    infob=getP model b
                    infoc=getP model c                           
                    posa=infoa.pos
                    posb=infob.pos
                    posc=infoc.pos
                in
                    circle3P posa posb posc
            Nothing->{center={x=0,y=0},radius=0}--this will never happen
        
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

getCList:Model->CList
getCList model=
    let 
        circles=getCircles model
    in
        Dict.map
            (\label circle->getC model label
            )
            circles
