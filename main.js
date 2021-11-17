(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.V.ae === region.as.ae)
	{
		return 'on line ' + region.V.ae;
	}
	return 'on lines ' + region.V.ae + ' through ' + region.as.ae;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bw,
		impl.bX,
		impl.bR,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		P: func(record.P),
		az: record.az,
		aw: record.aw
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.P;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.az;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aw) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bw,
		impl.bX,
		impl.bR,
		function(sendToApp, initialModel) {
			var view = impl.bZ;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bw,
		impl.bX,
		impl.bR,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.ag && impl.ag(sendToApp)
			var view = impl.bZ;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.be);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bV) && (_VirtualDom_doc.title = title = doc.bV);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bE;
	var onUrlRequest = impl.bF;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		ag: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.a1 === next.a1
							&& curr.aM === next.aM
							&& curr.a_.a === next.a_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		bw: function(flags)
		{
			return A3(impl.bw, flags, _Browser_getUrl(), key);
		},
		bZ: impl.bZ,
		bX: impl.bX,
		bR: impl.bR
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { l: 'hidden', ad: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { l: 'mozHidden', ad: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { l: 'msHidden', ad: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { l: 'webkitHidden', ad: 'webkitvisibilitychange' }
		: { l: 'hidden', ad: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		a7: _Browser_getScene(),
		ba: {
			a: _Browser_window.pageXOffset,
			b: _Browser_window.pageYOffset,
			M: _Browser_doc.documentElement.clientWidth,
			J: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		M: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		J: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			a7: {
				M: node.scrollWidth,
				J: node.scrollHeight
			},
			ba: {
				a: node.scrollLeft,
				b: node.scrollTop,
				M: node.clientWidth,
				J: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			a7: _Browser_getScene(),
			ba: {
				a: x,
				b: y,
				M: _Browser_doc.documentElement.clientWidth,
				J: _Browser_doc.documentElement.clientHeight
			},
			bq: {
				a: x + rect.left,
				b: y + rect.top,
				M: rect.width,
				J: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var author$project$Main$Model = function (styles) {
	return function (points) {
		return function (lines) {
			return function (labels) {
				return function (circles) {
					return function (pstates) {
						return function (lstates) {
							return function (drag) {
								return function (mOver) {
									return function (input) {
										return function (prompt) {
											return {s: circles, I: drag, O: input, o: labels, t: lines, p: lstates, Y: mOver, i: points, r: prompt, u: pstates, j: styles};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var author$project$Main$Cir2 = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$Cir3 = function (a) {
	return {$: 1, a: a};
};
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.k) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.n),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.n);
		} else {
			var treeLen = builder.k * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.q) : builder.q;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.k);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.n) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.n);
		}
	});
var elm$core$Basics$False = 1;
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{q: nodeList, k: (len / elm$core$Array$branchFactor) | 0, n: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Main$decodeCircle = A2(
	elm$json$Json$Decode$andThen,
	function (t) {
		switch (t) {
			case 'Cir2':
				return A3(
					elm$json$Json$Decode$map2,
					F2(
						function (a, b) {
							return author$project$Main$Cir2(
								{d: a, e: b});
						}),
					A2(elm$json$Json$Decode$field, 'plabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'llabel', elm$json$Json$Decode$string));
			case 'Cir3':
				return A4(
					elm$json$Json$Decode$map3,
					F3(
						function (a, b, c) {
							return author$project$Main$Cir3(
								{d: a, e: b, B: c});
						}),
					A2(elm$json$Json$Decode$field, 'plabel1', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'plabel2', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'plabel3', elm$json$Json$Decode$string));
			default:
				return elm$json$Json$Decode$fail('error in circle');
		}
	},
	A2(elm$json$Json$Decode$field, 'type', elm$json$Json$Decode$string));
var author$project$Main$LineAB = elm$core$Basics$identity;
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Main$decodeLine = A2(
	elm$json$Json$Decode$andThen,
	function (t) {
		if (t === 'LineAB') {
			return A3(
				elm$json$Json$Decode$map2,
				F2(
					function (a, b) {
						return {d: a, e: b};
					}),
				A2(elm$json$Json$Decode$field, 'plabel1', elm$json$Json$Decode$string),
				A2(elm$json$Json$Decode$field, 'plabel2', elm$json$Json$Decode$string));
		} else {
			return elm$json$Json$Decode$fail('error in line');
		}
	},
	A2(elm$json$Json$Decode$field, 'type', elm$json$Json$Decode$string));
var elm$json$Json$Decode$bool = _Json_decodeBool;
var author$project$Main$decodeLstate = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (h, d) {
			return {H: d, l: h};
		}),
	A2(elm$json$Json$Decode$field, 'hidden', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'dashed', elm$json$Json$Decode$bool));
var author$project$Main$FP = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$FPOC = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var author$project$Main$FPOL = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Main$P2C = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var author$project$Main$P2L = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var author$project$Main$PCL = F3(
	function (a, b, c) {
		return {$: 6, a: a, b: b, c: c};
	});
var author$project$Main$POL = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var author$project$Main$POLP = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var elm$json$Json$Decode$float = _Json_decodeFloat;
var author$project$Main$decodePosition = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return {a: x, b: y};
		}),
	A2(elm$json$Json$Decode$field, 'x', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'y', elm$json$Json$Decode$float));
var elm$json$Json$Decode$map = _Json_map1;
var author$project$Main$decodePoint = A2(
	elm$json$Json$Decode$andThen,
	function (t) {
		switch (t) {
			case 'FP':
				return A2(
					elm$json$Json$Decode$map,
					author$project$Main$FP,
					A2(elm$json$Json$Decode$field, 'position', author$project$Main$decodePosition));
			case 'POL':
				return A4(
					elm$json$Json$Decode$map3,
					author$project$Main$POL,
					A2(elm$json$Json$Decode$field, 'llabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'l1label', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'l2label', elm$json$Json$Decode$string));
			case 'FPOL':
				return A3(
					elm$json$Json$Decode$map2,
					author$project$Main$FPOL,
					A2(elm$json$Json$Decode$field, 'llabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'position', author$project$Main$decodePosition));
			case 'P2L':
				return A3(
					elm$json$Json$Decode$map2,
					author$project$Main$P2L,
					A2(elm$json$Json$Decode$field, 'llabel1', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'llabel2', elm$json$Json$Decode$string));
			case 'POLP':
				return A3(
					elm$json$Json$Decode$map2,
					author$project$Main$POLP,
					A2(elm$json$Json$Decode$field, 'plabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'llabel', elm$json$Json$Decode$string));
			case 'P2C':
				return A4(
					elm$json$Json$Decode$map3,
					author$project$Main$P2C,
					A2(elm$json$Json$Decode$field, 'clabel1', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'clabel2', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'isPositive', elm$json$Json$Decode$bool));
			case 'PCL':
				return A4(
					elm$json$Json$Decode$map3,
					author$project$Main$PCL,
					A2(elm$json$Json$Decode$field, 'clabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'llabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'isPositive', elm$json$Json$Decode$bool));
			case 'FPOC':
				return A3(
					elm$json$Json$Decode$map2,
					author$project$Main$FPOC,
					A2(elm$json$Json$Decode$field, 'clabel', elm$json$Json$Decode$string),
					A2(elm$json$Json$Decode$field, 'position', author$project$Main$decodePosition));
			default:
				return elm$json$Json$Decode$fail('error in point');
		}
	},
	A2(elm$json$Json$Decode$field, 'type', elm$json$Json$Decode$string));
var author$project$Main$decodePstate = A2(
	elm$json$Json$Decode$map,
	function (h) {
		return {l: h};
	},
	A2(elm$json$Json$Decode$field, 'hidden', elm$json$Json$Decode$bool));
var author$project$Main$decodeStyles = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (w, h) {
			return {J: h, M: w};
		}),
	A2(elm$json$Json$Decode$field, 'width', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'height', elm$json$Json$Decode$float));
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		elm$json$Json$Decode$map,
		elm$core$Dict$fromList,
		elm$json$Json$Decode$keyValuePairs(decoder));
};
var elm$json$Json$Decode$map7 = _Json_map7;
var author$project$Main$decodeObjs = A8(
	elm$json$Json$Decode$map7,
	F7(
		function (ss, ps, ls, cs, las, pss, lss) {
			return {s: cs, o: las, t: ls, p: lss, i: ps, r: '', u: pss, j: ss};
		}),
	A2(elm$json$Json$Decode$field, 'styles', author$project$Main$decodeStyles),
	A2(
		elm$json$Json$Decode$field,
		'points',
		elm$json$Json$Decode$dict(author$project$Main$decodePoint)),
	A2(
		elm$json$Json$Decode$field,
		'lines',
		elm$json$Json$Decode$dict(author$project$Main$decodeLine)),
	A2(
		elm$json$Json$Decode$field,
		'circles',
		elm$json$Json$Decode$dict(author$project$Main$decodeCircle)),
	A2(
		elm$json$Json$Decode$field,
		'labels',
		elm$json$Json$Decode$dict(author$project$Main$decodePosition)),
	A2(
		elm$json$Json$Decode$field,
		'pstates',
		elm$json$Json$Decode$dict(author$project$Main$decodePstate)),
	A2(
		elm$json$Json$Decode$field,
		'lstates',
		elm$json$Json$Decode$dict(author$project$Main$decodeLstate)));
var author$project$Main$defaultStyles = {J: 300, M: 500};
var author$project$Main$emptyObjs = {s: elm$core$Dict$empty, o: elm$core$Dict$empty, t: elm$core$Dict$empty, p: elm$core$Dict$empty, i: elm$core$Dict$empty, r: '', u: elm$core$Dict$empty, j: author$project$Main$defaultStyles};
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var author$project$Main$interpret0 = function (objsStr) {
	var result = A2(elm$json$Json$Decode$decodeString, author$project$Main$decodeObjs, objsStr);
	if (!result.$) {
		var objs = result.a;
		return objs;
	} else {
		var error = result.a;
		return _Utils_update(
			author$project$Main$emptyObjs,
			{r: 'error'});
	}
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (_n0) {
	var input = _n0.O;
	var objsStr = _n0.aT;
	var objs = author$project$Main$interpret0(objsStr);
	return _Utils_Tuple2(
		author$project$Main$Model(objs.j)(objs.i)(objs.t)(objs.o)(objs.s)(objs.u)(objs.p)(elm$core$Maybe$Nothing)(elm$core$Maybe$Nothing)(input)(''),
		elm$core$Platform$Cmd$none);
};
var author$project$Main$DragAt = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$DragEnd = function (a) {
	return {$: 2, a: a};
};
var elm$json$Json$Decode$int = _Json_decodeInt;
var author$project$Main$mousePosition = function () {
	var y = A2(elm$json$Json$Decode$field, 'pageY', elm$json$Json$Decode$int);
	var x = A2(elm$json$Json$Decode$field, 'pageX', elm$json$Json$Decode$int);
	return A3(
		elm$json$Json$Decode$map2,
		F2(
			function (a, b) {
				return {a: a, b: b};
			}),
		x,
		y);
}();
var elm$browser$Browser$Events$Document = 0;
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {aZ: pids, a8: subs};
	});
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {aH: event, aP: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aK: fragment, aM: host, aY: path, a_: port_, a1: protocol, a2: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.aZ,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.aP;
		var event = _n0.aH;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.a8);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$browser$Browser$Events$onMouseMove = A2(elm$browser$Browser$Events$on, 0, 'mousemove');
var elm$browser$Browser$Events$onMouseUp = A2(elm$browser$Browser$Events$on, 0, 'mouseup');
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$subscriptions = function (model) {
	var _n0 = model.I;
	if (_n0.$ === 1) {
		return elm$core$Platform$Sub$none;
	} else {
		var drag = _n0.a;
		return elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					elm$browser$Browser$Events$onMouseMove(
					A2(elm$json$Json$Decode$map, author$project$Main$DragAt, author$project$Main$mousePosition)),
					elm$browser$Browser$Events$onMouseUp(
					A2(elm$json$Json$Decode$map, author$project$Main$DragEnd, author$project$Main$mousePosition))
				]));
	}
};
var author$project$Main$Drag = F3(
	function (obj, start, current) {
		return {aq: current, af: obj, V: start};
	});
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Main$encodeCircle = function (circle) {
	if (!circle.$) {
		var pl = circle.a;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('Cir2')),
					_Utils_Tuple2(
					'plabel',
					elm$json$Json$Encode$string(pl.d)),
					_Utils_Tuple2(
					'llabel',
					elm$json$Json$Encode$string(pl.e))
				]));
	} else {
		var threeP = circle.a;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('Cir3')),
					_Utils_Tuple2(
					'plabel1',
					elm$json$Json$Encode$string(threeP.d)),
					_Utils_Tuple2(
					'plabel2',
					elm$json$Json$Encode$string(threeP.e)),
					_Utils_Tuple2(
					'plabel3',
					elm$json$Json$Encode$string(threeP.B))
				]));
	}
};
var author$project$Main$encodeLine = function (_n0) {
	var twoP = _n0;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string('LineAB')),
				_Utils_Tuple2(
				'plabel1',
				elm$json$Json$Encode$string(twoP.d)),
				_Utils_Tuple2(
				'plabel2',
				elm$json$Json$Encode$string(twoP.e))
			]));
};
var elm$json$Json$Encode$bool = _Json_wrap;
var author$project$Main$encodeLstate = function (lstate) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'hidden',
				elm$json$Json$Encode$bool(lstate.l)),
				_Utils_Tuple2(
				'dashed',
				elm$json$Json$Encode$bool(lstate.H))
			]));
};
var elm$json$Json$Encode$float = _Json_wrap;
var author$project$Main$encodePosition = function (pos) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'x',
				elm$json$Json$Encode$float(pos.a)),
				_Utils_Tuple2(
				'y',
				elm$json$Json$Encode$float(pos.b))
			]));
};
var author$project$Main$encodePoint = function (point) {
	switch (point.$) {
		case 0:
			var pos = point.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('FP')),
						_Utils_Tuple2(
						'position',
						author$project$Main$encodePosition(pos))
					]));
		case 1:
			var ll = point.a;
			var l1 = point.b;
			var l2 = point.c;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('POL')),
						_Utils_Tuple2(
						'llabel',
						elm$json$Json$Encode$string(ll)),
						_Utils_Tuple2(
						'l1label',
						elm$json$Json$Encode$string(l1)),
						_Utils_Tuple2(
						'l2label',
						elm$json$Json$Encode$string(l2))
					]));
		case 2:
			var ll = point.a;
			var pos = point.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('FPOL')),
						_Utils_Tuple2(
						'llabel',
						elm$json$Json$Encode$string(ll)),
						_Utils_Tuple2(
						'position',
						author$project$Main$encodePosition(pos))
					]));
		case 3:
			var ll1 = point.a;
			var ll2 = point.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('P2L')),
						_Utils_Tuple2(
						'llabel1',
						elm$json$Json$Encode$string(ll1)),
						_Utils_Tuple2(
						'llabel2',
						elm$json$Json$Encode$string(ll2))
					]));
		case 4:
			var pl = point.a;
			var ll = point.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('POLP')),
						_Utils_Tuple2(
						'plabel',
						elm$json$Json$Encode$string(pl)),
						_Utils_Tuple2(
						'llabel',
						elm$json$Json$Encode$string(ll))
					]));
		case 5:
			var c1 = point.a;
			var c2 = point.b;
			var isPositive = point.c;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('P2C')),
						_Utils_Tuple2(
						'clabel1',
						elm$json$Json$Encode$string(c1)),
						_Utils_Tuple2(
						'clabel2',
						elm$json$Json$Encode$string(c2)),
						_Utils_Tuple2(
						'isPositive',
						elm$json$Json$Encode$bool(isPositive))
					]));
		case 6:
			var c = point.a;
			var l = point.b;
			var isPositive = point.c;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('PCL')),
						_Utils_Tuple2(
						'clabel',
						elm$json$Json$Encode$string(c)),
						_Utils_Tuple2(
						'llabel',
						elm$json$Json$Encode$string(l)),
						_Utils_Tuple2(
						'isPositive',
						elm$json$Json$Encode$bool(isPositive))
					]));
		default:
			var clabel = point.a;
			var position = point.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('FPOC')),
						_Utils_Tuple2(
						'clabel',
						elm$json$Json$Encode$string(clabel)),
						_Utils_Tuple2(
						'position',
						author$project$Main$encodePosition(position))
					]));
	}
};
var author$project$Main$encodePstate = function (pstate) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'hidden',
				elm$json$Json$Encode$bool(pstate.l))
			]));
};
var author$project$Main$encodeStyles = function (styles) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'width',
				elm$json$Json$Encode$float(styles.M)),
				_Utils_Tuple2(
				'height',
				elm$json$Json$Encode$float(styles.J))
			]));
};
var elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2(elm$core$Dict$map, func, left),
				A2(elm$core$Dict$map, func, right));
		}
	});
var author$project$Main$encodeObjs = function (objs) {
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'styles',
				author$project$Main$encodeStyles(objs.j)),
				_Utils_Tuple2(
				'points',
				elm$json$Json$Encode$object(
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$map,
							F2(
								function (name, point) {
									return author$project$Main$encodePoint(point);
								}),
							objs.i)))),
				_Utils_Tuple2(
				'lines',
				elm$json$Json$Encode$object(
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$map,
							F2(
								function (name, line) {
									return author$project$Main$encodeLine(line);
								}),
							objs.t)))),
				_Utils_Tuple2(
				'circles',
				elm$json$Json$Encode$object(
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$map,
							F2(
								function (name, circle) {
									return author$project$Main$encodeCircle(circle);
								}),
							objs.s)))),
				_Utils_Tuple2(
				'labels',
				elm$json$Json$Encode$object(
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$map,
							F2(
								function (name, pos) {
									return author$project$Main$encodePosition(pos);
								}),
							objs.o)))),
				_Utils_Tuple2(
				'pstates',
				elm$json$Json$Encode$object(
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$map,
							F2(
								function (name, pstate) {
									return author$project$Main$encodePstate(pstate);
								}),
							objs.u)))),
				_Utils_Tuple2(
				'lstates',
				elm$json$Json$Encode$object(
					elm$core$Dict$toList(
						A2(
							elm$core$Dict$map,
							F2(
								function (name, lstate) {
									return author$project$Main$encodeLstate(lstate);
								}),
							objs.p))))
			]));
};
var author$project$Main$Position = F2(
	function (x, y) {
		return {a: x, b: y};
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var author$project$Main$truncatePos = F2(
	function (model, pos) {
		var maxy = (model.j.J / 2) - 10;
		var y = (_Utils_cmp(
			elm$core$Basics$abs(pos.b),
			maxy) < 0) ? pos.b : ((pos.b > 0) ? maxy : (-maxy));
		var maxx = (model.j.M / 2) - 10;
		var x = (_Utils_cmp(
			elm$core$Basics$abs(pos.a),
			maxx) < 0) ? pos.a : ((pos.a > 0) ? maxx : (-maxx));
		return {a: x, b: y};
	});
var author$project$Main$translatePos = F4(
	function (model, pos, start, current) {
		var newPos = A2(author$project$Main$Position, (pos.a + current.a) - start.a, pos.b - (current.b - start.b));
		return A2(author$project$Main$truncatePos, model, newPos);
	});
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr === 1) {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === -1) {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === -1) {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === -1) {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (!_n0.$) {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Main$getLabels = function (model) {
	var _n0 = model.I;
	if (_n0.$ === 1) {
		return model.o;
	} else {
		var obj = _n0.a.af;
		var start = _n0.a.V;
		var current = _n0.a.aq;
		if (obj.$ === 1) {
			var label = obj.a;
			return A3(
				elm$core$Dict$update,
				label,
				elm$core$Maybe$map(
					function (pos) {
						return A4(author$project$Main$translatePos, model, pos, start, current);
					}),
				model.o);
		} else {
			return model.o;
		}
	}
};
var author$project$Main$Label = function (a) {
	return {$: 1, a: a};
};
var author$project$Main$P = function (a) {
	return {$: 0, a: a};
};
var author$project$Main$twoPointLine = function (twoPos) {
	var y2 = twoPos.e.b;
	var y1 = twoPos.d.b;
	var x2 = twoPos.e.a;
	var x1 = twoPos.d.a;
	var s = x1 - x2;
	var r = y2 - y1;
	var d = (x1 * y2) - (x2 * y1);
	return {d: r, e: s, B: d};
};
var author$project$Main$intersectionL = F2(
	function (twoPos1, twoPos2) {
		var l2 = author$project$Main$twoPointLine(twoPos2);
		var r2 = l2.d;
		var s2 = l2.e;
		var l1 = author$project$Main$twoPointLine(twoPos1);
		var r1 = l1.d;
		var s1 = l1.e;
		var dd = (r1 * s2) - (s1 * r2);
		var d2 = l2.B;
		var d1 = l1.B;
		var x = ((d1 * s2) - (d2 * s1)) / dd;
		var y = ((r1 * d2) - (r2 * d1)) / dd;
		return {a: x, b: y};
	});
var author$project$Main$minusPos = F2(
	function (pos1, pos2) {
		return {a: pos1.a - pos2.a, b: pos1.b - pos2.b};
	});
var author$project$Main$plusPos = F2(
	function (pos1, pos2) {
		return {a: pos1.a + pos2.a, b: pos1.b + pos2.b};
	});
var author$project$Main$scalePos = F2(
	function (scale, pos) {
		return {a: scale * pos.a, b: scale * pos.b};
	});
var author$project$Main$midperpend = function (twoPos) {
	var dir = A2(author$project$Main$minusPos, twoPos.d, twoPos.e);
	var perdir = {a: -dir.b, b: dir.a};
	var center = A2(
		author$project$Main$scalePos,
		0.5,
		A2(author$project$Main$plusPos, twoPos.d, twoPos.e));
	var perPos = A2(author$project$Main$plusPos, center, perdir);
	return {d: center, e: perPos};
};
var elm$core$Basics$sqrt = _Basics_sqrt;
var author$project$Main$circle3P = F3(
	function (a, b, c) {
		var twoPosac = {d: a, e: c};
		var twoPosab = {d: a, e: b};
		var midperac = author$project$Main$midperpend(twoPosac);
		var midperab = author$project$Main$midperpend(twoPosab);
		var center = A2(author$project$Main$intersectionL, midperab, midperac);
		var dr = A2(author$project$Main$minusPos, a, center);
		var radius = elm$core$Basics$sqrt((dr.a * dr.a) + (dr.b * dr.b));
		return {C: center, F: radius};
	});
var author$project$Main$circleNameToCircle = function (clabel) {
	var _n0 = elm$core$String$length(clabel);
	switch (_n0) {
		case 11:
			var b = A3(elm$core$String$slice, 9, 11, clabel);
			var a = A3(elm$core$String$slice, 7, 8, clabel);
			return elm$core$Maybe$Just(
				author$project$Main$Cir2(
					{d: a, e: b}));
		case 10:
			var c = A3(elm$core$String$slice, 9, 10, clabel);
			var b = A3(elm$core$String$slice, 8, 9, clabel);
			var a = A3(elm$core$String$slice, 7, 8, clabel);
			return elm$core$Maybe$Just(
				author$project$Main$Cir3(
					{d: a, e: b, B: c}));
		default:
			return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$defaultSta = {v: false, y: false};
var author$project$Main$footPoint = F2(
	function (twoP, pos) {
		var vap = A2(author$project$Main$minusPos, pos, twoP.d);
		var vab = A2(author$project$Main$minusPos, twoP.e, twoP.d);
		var len = (vab.a * vab.a) + (vab.b * vab.b);
		var dot = (vap.a * vab.a) + (vap.b * vab.b);
		var scale = dot / len;
		return A2(
			author$project$Main$plusPos,
			twoP.d,
			A2(author$project$Main$scalePos, scale, vab));
	});
var author$project$Main$fromJust = F2(
	function (na, x) {
		if (!x.$) {
			var y = x.a;
			return y;
		} else {
			return na;
		}
	});
var author$project$Main$getCircles = function (model) {
	return model.s;
};
var author$project$Main$getLabelPos = F2(
	function (model, label) {
		var labels = author$project$Main$getLabels(model);
		return A2(elm$core$Dict$get, label, labels);
	});
var author$project$Main$getLines = function (model) {
	return model.t;
};
var elm$core$Basics$pow = _Basics_pow;
var author$project$Main$intersectionCL = F3(
	function (cinfo, l, isPositive) {
		var r = cinfo.F;
		var o = cinfo.C;
		var c = l.B;
		var b = l.e;
		var a = l.d;
		var aa = (((a * a) * o.b) + (b * c)) - ((a * b) * o.a);
		var d = elm$core$Basics$sqrt(
			A2(elm$core$Basics$pow, (((a * b) * o.a) - (b * c)) - ((a * a) * o.b), 2) - ((A2(elm$core$Basics$pow, a, 2) + A2(elm$core$Basics$pow, b, 2)) * ((A2(elm$core$Basics$pow, c, 2) - (((2 * a) * c) * o.a)) + (A2(elm$core$Basics$pow, a, 2) * ((A2(elm$core$Basics$pow, o.a, 2) + A2(elm$core$Basics$pow, o.b, 2)) - A2(elm$core$Basics$pow, r, 2))))));
		var sign = (a < 0) ? 1 : (-1);
		var y = isPositive ? ((aa + (sign * d)) / (A2(elm$core$Basics$pow, a, 2) + A2(elm$core$Basics$pow, b, 2))) : ((aa - (sign * d)) / (A2(elm$core$Basics$pow, a, 2) + A2(elm$core$Basics$pow, b, 2)));
		var x = (elm$core$Basics$abs(a) < 1.0e-4) ? (o.a + (sign * elm$core$Basics$sqrt(
			A2(elm$core$Basics$pow, r, 2) - A2(elm$core$Basics$pow, y - o.b, 2)))) : ((c - (b * y)) / a);
		return {a: x, b: y};
	});
var author$project$Main$intersectionC = F3(
	function (c1, c2, isPositive) {
		var c2r = c2.F;
		var c2o = c2.C;
		var c1r = c1.F;
		var c1o = c1.C;
		var c = ((((((c2r * c2r) - (c1r * c1r)) + (c1o.a * c1o.a)) + (c1o.b * c1o.b)) - (c2o.a * c2o.a)) - (c2o.b * c2o.b)) / 2;
		var b = c1o.b - c2o.b;
		var a = c1o.a - c2o.a;
		var l = {d: a, e: b, B: c};
		return A3(author$project$Main$intersectionCL, c1, l, isPositive);
	});
var author$project$Main$lineNameToLine = function (l) {
	var _n0 = elm$core$String$length(l);
	if (_n0 === 2) {
		var p2 = A3(elm$core$String$slice, 1, 2, l);
		var p1 = A3(elm$core$String$slice, 0, 1, l);
		return elm$core$Maybe$Just(
			{d: p1, e: p2});
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Main$nPos = {a: 0 / 0, b: 0 / 0};
var author$project$Main$nPoint = author$project$Main$FP(author$project$Main$nPos);
var elm$core$Basics$atan2 = _Basics_atan2;
var elm$core$Basics$cos = _Basics_cos;
var elm$core$Basics$sin = _Basics_sin;
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$String$toFloat = _String_toFloat;
var author$project$Main$getC = F2(
	function (model, clabel) {
		var circles = author$project$Main$getCircles(model);
		var circle = A2(elm$core$Dict$member, clabel, circles) ? A2(elm$core$Dict$get, clabel, circles) : author$project$Main$circleNameToCircle(clabel);
		if (!circle.$) {
			if (!circle.a.$) {
				var a = circle.a.a.d;
				var b = circle.a.a.e;
				var infob = A2(author$project$Main$getL, model, b);
				var posb = infob.z;
				var infoa = A2(author$project$Main$getP, model, a);
				var posa = infoa.m;
				var dpos = A2(author$project$Main$minusPos, posb.d, posb.e);
				var r = elm$core$Basics$sqrt((dpos.a * dpos.a) + (dpos.b * dpos.b));
				var cpos = posa;
				return {C: cpos, F: r};
			} else {
				var a = circle.a.a.d;
				var b = circle.a.a.e;
				var c = circle.a.a.B;
				var infoc = A2(author$project$Main$getP, model, c);
				var posc = infoc.m;
				var infob = A2(author$project$Main$getP, model, b);
				var posb = infob.m;
				var infoa = A2(author$project$Main$getP, model, a);
				var posa = infoa.m;
				return A3(author$project$Main$circle3P, posa, posb, posc);
			}
		} else {
			return {
				C: {a: 0, b: 0},
				F: 0
			};
		}
	});
var author$project$Main$getL = F2(
	function (model, llabel) {
		var state = A2(elm$core$Dict$get, llabel, model.p);
		var lines = author$project$Main$getLines(model);
		var line = A2(elm$core$Dict$member, llabel, lines) ? A2(elm$core$Dict$get, llabel, lines) : author$project$Main$lineNameToLine(llabel);
		if (!line.$) {
			var a = line.a.d;
			var b = line.a.e;
			return {
				w: state,
				z: {
					d: A2(author$project$Main$getP, model, a).m,
					e: A2(author$project$Main$getP, model, b).m
				}
			};
		} else {
			return {
				w: elm$core$Maybe$Nothing,
				z: {
					d: {a: 0, b: 0},
					e: {a: 0, b: 0}
				}
			};
		}
	});
var author$project$Main$getLength = F2(
	function (model, label) {
		var linfo = A2(author$project$Main$getL, model, label);
		var twoPos = linfo.z;
		var posa = twoPos.d;
		var posb = twoPos.e;
		var dpos = A2(author$project$Main$minusPos, posa, posb);
		return elm$core$Basics$sqrt((dpos.a * dpos.a) + (dpos.b * dpos.b));
	});
var author$project$Main$getP = F2(
	function (model, plabel) {
		var point = A2(author$project$Main$getPoint, model, plabel);
		var obj = author$project$Main$P(plabel);
		var labelObj = author$project$Main$Label(plabel);
		var extraSta = A2(elm$core$Dict$get, plabel, model.u);
		var dragObj = A2(
			elm$core$Maybe$map,
			function ($) {
				return $.af;
			},
			model.I);
		switch (point.$) {
			case 0:
				var pos = point.a;
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: pos,
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: _Utils_eq(
								elm$core$Maybe$Just(obj),
								model.Y) || _Utils_eq(
								elm$core$Maybe$Just(obj),
								dragObj),
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			case 2:
				var llabel = point.a;
				var pos = point.b;
				var actualPos = A2(
					author$project$Main$footPoint,
					A2(author$project$Main$getL, model, llabel).z,
					pos);
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: actualPos,
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: _Utils_eq(
								elm$core$Maybe$Just(obj),
								model.Y) || _Utils_eq(
								elm$core$Maybe$Just(obj),
								dragObj),
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			case 1:
				var llabel = point.a;
				var l1 = point.b;
				var l2 = point.c;
				var linfo = A2(author$project$Main$getL, model, llabel);
				var twoPos = linfo.z;
				var posa = twoPos.d;
				var posb = twoPos.e;
				var vab = A2(author$project$Main$minusPos, posb, posa);
				var f2 = function () {
					var _n4 = elm$core$String$toFloat(l2);
					if (!_n4.$) {
						var a = _n4.a;
						return a;
					} else {
						return A2(author$project$Main$getLength, model, l2);
					}
				}();
				var f1 = function () {
					var _n3 = elm$core$String$toFloat(l1);
					if (!_n3.$) {
						var a = _n3.a;
						return a;
					} else {
						return A2(author$project$Main$getLength, model, l1);
					}
				}();
				var ratio = f1 / (f1 + f2);
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: A2(
						author$project$Main$plusPos,
						posa,
						A2(author$project$Main$scalePos, ratio, vab)),
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: false,
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			case 3:
				var l1 = point.a;
				var l2 = point.b;
				var twoPos2 = A2(author$project$Main$getL, model, l2).z;
				var twoPos1 = A2(author$project$Main$getL, model, l1).z;
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: A2(author$project$Main$intersectionL, twoPos1, twoPos2),
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: false,
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			case 4:
				var pl = point.a;
				var ll = point.b;
				var twoP = A2(author$project$Main$getL, model, ll);
				var pinfo = A2(author$project$Main$getP, model, pl);
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: A2(author$project$Main$footPoint, twoP.z, pinfo.m),
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: false,
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			case 5:
				var c1 = point.a;
				var c2 = point.b;
				var isPositive = point.c;
				var c2info = A2(author$project$Main$getC, model, c2);
				var c1info = A2(author$project$Main$getC, model, c1);
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: A3(author$project$Main$intersectionC, c1info, c2info, isPositive),
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: false,
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			case 6:
				var c = point.a;
				var l = point.b;
				var isPositive = point.c;
				var linfo = A2(author$project$Main$getL, model, l);
				var cinfo = A2(author$project$Main$getC, model, c);
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: A3(
						author$project$Main$intersectionCL,
						cinfo,
						author$project$Main$twoPointLine(linfo.z),
						isPositive),
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: false,
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
			default:
				var clabel = point.a;
				var pos = point.b;
				var c = A2(author$project$Main$getC, model, clabel);
				var center = c.C;
				var d = A2(author$project$Main$minusPos, pos, center);
				var r = c.F;
				var angle = A2(elm$core$Basics$atan2, d.b, d.a);
				var actualPos = A2(
					author$project$Main$plusPos,
					center,
					{
						a: r * elm$core$Basics$cos(angle),
						b: r * elm$core$Basics$sin(angle)
					});
				return {
					w: extraSta,
					D: A2(author$project$Main$getLabelPos, model, plabel),
					m: actualPos,
					G: _Utils_update(
						author$project$Main$defaultSta,
						{
							v: _Utils_eq(
								elm$core$Maybe$Just(obj),
								model.Y) || _Utils_eq(
								elm$core$Maybe$Just(obj),
								dragObj),
							y: _Utils_eq(
								elm$core$Maybe$Just(labelObj),
								dragObj)
						})
				};
		}
	});
var author$project$Main$getPoint = F2(
	function (model, plabel) {
		var point = A2(
			author$project$Main$fromJust,
			author$project$Main$nPoint,
			A2(elm$core$Dict$get, plabel, model.i));
		var _n0 = model.I;
		if (_n0.$ === 1) {
			return point;
		} else {
			var obj = _n0.a.af;
			var start = _n0.a.V;
			var current = _n0.a.aq;
			if (_Utils_eq(
				obj,
				author$project$Main$P(plabel))) {
				switch (point.$) {
					case 0:
						var pos = point.a;
						return author$project$Main$FP(
							A4(author$project$Main$translatePos, model, pos, start, current));
					case 2:
						var llabel = point.a;
						var pos = point.b;
						var newPos = A4(author$project$Main$translatePos, model, pos, start, current);
						var actualPos = A2(
							author$project$Main$footPoint,
							A2(author$project$Main$getL, model, llabel).z,
							newPos);
						return A2(author$project$Main$FPOL, llabel, actualPos);
					case 7:
						var clabel = point.a;
						var pos = point.b;
						var newPos = A4(author$project$Main$translatePos, model, pos, start, current);
						var c = A2(author$project$Main$getC, model, clabel);
						var center = c.C;
						var d = A2(author$project$Main$minusPos, newPos, center);
						var r = c.F;
						var angle = A2(elm$core$Basics$atan2, d.b, d.a);
						var actualPos = A2(
							author$project$Main$plusPos,
							center,
							{
								a: r * elm$core$Basics$cos(angle),
								b: r * elm$core$Basics$sin(angle)
							});
						return A2(author$project$Main$FPOC, clabel, actualPos);
					default:
						return point;
				}
			} else {
				return point;
			}
		}
	});
var author$project$Main$getPoints = function (model) {
	return A2(
		elm$core$Dict$map,
		F2(
			function (label, pold) {
				return A2(author$project$Main$getPoint, model, label);
			}),
		model.i);
};
var author$project$Main$defaultLSta = {H: false, l: false};
var author$project$Main$mergeLstate = F2(
	function (s1, s) {
		if (s.$ === 1) {
			return s1;
		} else {
			var s2 = s.a;
			return _Utils_update(
				author$project$Main$defaultLSta,
				{H: s1.H || s2.H, l: s1.l || s2.l});
		}
	});
var author$project$Main$mergeLstates = F2(
	function (s1, s2) {
		return A3(
			elm$core$Dict$foldl,
			F3(
				function (c, v, d) {
					var vv = A2(
						author$project$Main$mergeLstate,
						v,
						A2(elm$core$Dict$get, c, d));
					return A3(elm$core$Dict$insert, c, vv, d);
				}),
			s2,
			s1);
	});
var author$project$Main$defaultPSta = {l: false};
var author$project$Main$mergePstate = F2(
	function (ps1, s) {
		if (s.$ === 1) {
			return ps1;
		} else {
			var ps2 = s.a;
			return _Utils_update(
				author$project$Main$defaultPSta,
				{l: ps1.l || ps2.l});
		}
	});
var author$project$Main$mergePstates = F2(
	function (ps1, ps2) {
		return A3(
			elm$core$Dict$foldl,
			F3(
				function (c, v, d) {
					var vv = A2(
						author$project$Main$mergePstate,
						v,
						A2(elm$core$Dict$get, c, d));
					return A3(elm$core$Dict$insert, c, vv, d);
				}),
			ps2,
			ps1);
	});
var author$project$Main$addObjs = F2(
	function (objsAdded, objs) {
		return _Utils_update(
			objs,
			{
				s: A2(elm$core$Dict$union, objsAdded.s, objs.s),
				t: A2(elm$core$Dict$union, objsAdded.t, objs.t),
				p: A2(author$project$Main$mergeLstates, objsAdded.p, objs.p),
				i: A2(elm$core$Dict$union, objsAdded.i, objs.i),
				r: elm$core$String$isEmpty(objsAdded.r) ? objs.r : (objs.r + ('\n' + objsAdded.r)),
				u: A2(author$project$Main$mergePstates, objsAdded.u, objs.u),
				j: _Utils_eq(objsAdded.j, author$project$Main$defaultStyles) ? objs.j : objsAdded.j
			});
	});
var author$project$Main$collectAndCheck = F2(
	function (model, objsList) {
		var objs = A3(elm$core$List$foldl, author$project$Main$addObjs, author$project$Main$emptyObjs, objsList);
		return _Utils_update(
			objs,
			{
				o: A2(
					elm$core$Dict$map,
					F2(
						function (s, p) {
							return A2(elm$core$Dict$member, s, model.o) ? A2(
								author$project$Main$fromJust,
								author$project$Main$nPos,
								A2(author$project$Main$getLabelPos, model, s)) : {a: 4, b: 4};
						}),
					objs.i)
			});
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var author$project$Main$showError = function (ds) {
	return A2(
		elm$core$String$join,
		'',
		A2(
			elm$core$List$take,
			1,
			elm$core$List$reverse(
				A2(
					elm$core$List$map,
					function (dead) {
						var _n0 = dead.bM;
						if (_n0.$ === 12) {
							var ps = _n0.a;
							return ps;
						} else {
							return 'Error when parsing ';
						}
					},
					ds))));
};
var author$project$Main$lineNameFrom2P = F2(
	function (p1, p2) {
		return (_Utils_cmp(p1, p2) < 0) ? _Utils_ap(p1, p2) : _Utils_ap(p2, p1);
	});
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$UnexpectedChar = {$: 11};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {aE: col, bk: contextStack, bM: problem, a6: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.a6, s.aE, x, s.g));
	});
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.f, s.c);
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{aE: 1, g: s.g, h: s.h, f: s.f + 1, a6: s.a6 + 1, c: s.c}) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{aE: s.aE + 1, g: s.g, h: s.h, f: newOffset, a6: s.a6, c: s.c}));
		};
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3(elm$core$String$slice, s0.f, s1.f, s0.c),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var author$project$Main$pointLabelName = A2(
	elm$parser$Parser$andThen,
	function (s) {
		return elm$core$String$isEmpty(s) ? elm$parser$Parser$problem('Expecting a name ') : elm$parser$Parser$succeed(s);
	},
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompIf(elm$core$Char$isAlpha)));
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var author$project$Main$lineLabelName = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			F2(
				function (p1, p2) {
					return A2(author$project$Main$lineNameFrom2P, p1, p2);
				})),
		author$project$Main$pointLabelName),
	author$project$Main$pointLabelName);
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Basics$not = _Basics_not;
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.f, s.a6, s.aE, s.c);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aE: newCol, g: s.g, h: s.h, f: newOffset, a6: newRow, c: s.c});
	};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var author$project$Main$circleLabelName = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			F2(
				function (a, b) {
					return 'circle:' + (a + b);
				})),
		author$project$Main$pointLabelName),
	elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						F2(
							function (a, b) {
								return _Utils_ap(a, b);
							})),
					author$project$Main$pointLabelName),
				author$project$Main$pointLabelName),
				A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(
						function (c) {
							return ':' + c;
						}),
					elm$parser$Parser$symbol(':')),
				author$project$Main$lineLabelName)
			])));
var elm$parser$Parser$Forbidden = 0;
var elm$parser$Parser$Advanced$Forbidden = 0;
var elm$parser$Parser$Advanced$Mandatory = 2;
var elm$parser$Parser$Advanced$Optional = 1;
var elm$parser$Parser$toAdvancedTrailing = function (trailing) {
	switch (trailing) {
		case 0:
			return 0;
		case 1:
			return 1;
		default:
			return 2;
	}
};
var elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toToken = function (str) {
	return A2(
		elm$parser$Parser$Advanced$Token,
		str,
		elm$parser$Parser$Expecting(str));
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$revAlways = F2(
	function (_n0, b) {
		return b;
	});
var elm$parser$Parser$Advanced$skip = F2(
	function (iParser, kParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$parser$Parser$Advanced$revAlways, iParser, kParser);
	});
var elm$parser$Parser$Advanced$sequenceEndForbidden = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				elm$parser$Parser$Advanced$sequenceEndForbidden,
				ender,
				ws,
				parseItem,
				sep,
				A2(elm$core$List$cons, item, revItems));
		};
		return A2(
			elm$parser$Parser$Advanced$skip,
			ws,
			elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								elm$parser$Parser$Advanced$map,
								function (item) {
									return elm$parser$Parser$Advanced$Loop(
										A2(elm$core$List$cons, item, revItems));
								},
								parseItem))),
						A2(
						elm$parser$Parser$Advanced$map,
						function (_n0) {
							return elm$parser$Parser$Advanced$Done(
								elm$core$List$reverse(revItems));
						},
						ender)
					])));
	});
var elm$parser$Parser$Advanced$sequenceEndMandatory = F4(
	function (ws, parseItem, sep, revItems) {
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$Advanced$map,
					function (item) {
						return elm$parser$Parser$Advanced$Loop(
							A2(elm$core$List$cons, item, revItems));
					},
					A2(
						elm$parser$Parser$Advanced$ignorer,
						parseItem,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							ws,
							A2(elm$parser$Parser$Advanced$ignorer, sep, ws)))),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return elm$parser$Parser$Advanced$Done(
							elm$core$List$reverse(revItems));
					},
					elm$parser$Parser$Advanced$succeed(0))
				]));
	});
var elm$parser$Parser$Advanced$sequenceEndOptional = F5(
	function (ender, ws, parseItem, sep, revItems) {
		var parseEnd = A2(
			elm$parser$Parser$Advanced$map,
			function (_n0) {
				return elm$parser$Parser$Advanced$Done(
					elm$core$List$reverse(revItems));
			},
			ender);
		return A2(
			elm$parser$Parser$Advanced$skip,
			ws,
			elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$Advanced$skip,
						sep,
						A2(
							elm$parser$Parser$Advanced$skip,
							ws,
							elm$parser$Parser$Advanced$oneOf(
								_List_fromArray(
									[
										A2(
										elm$parser$Parser$Advanced$map,
										function (item) {
											return elm$parser$Parser$Advanced$Loop(
												A2(elm$core$List$cons, item, revItems));
										},
										parseItem),
										parseEnd
									])))),
						parseEnd
					])));
	});
var elm$parser$Parser$Advanced$sequenceEnd = F5(
	function (ender, ws, parseItem, sep, trailing) {
		var chompRest = function (item) {
			switch (trailing) {
				case 0:
					return A2(
						elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4(elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
				case 1:
					return A2(
						elm$parser$Parser$Advanced$loop,
						_List_fromArray(
							[item]),
						A4(elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
				default:
					return A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$skip,
							ws,
							A2(
								elm$parser$Parser$Advanced$skip,
								sep,
								A2(
									elm$parser$Parser$Advanced$skip,
									ws,
									A2(
										elm$parser$Parser$Advanced$loop,
										_List_fromArray(
											[item]),
										A3(elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))),
						ender);
			}
		};
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(elm$parser$Parser$Advanced$andThen, chompRest, parseItem),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return _List_Nil;
					},
					ender)
				]));
	});
var elm$parser$Parser$Advanced$sequence = function (i) {
	return A2(
		elm$parser$Parser$Advanced$skip,
		elm$parser$Parser$Advanced$token(i.V),
		A2(
			elm$parser$Parser$Advanced$skip,
			i.ay,
			A5(
				elm$parser$Parser$Advanced$sequenceEnd,
				elm$parser$Parser$Advanced$token(i.as),
				i.ay,
				i.at,
				elm$parser$Parser$Advanced$token(i.ax),
				i.aA)));
};
var elm$parser$Parser$sequence = function (i) {
	return elm$parser$Parser$Advanced$sequence(
		{
			as: elm$parser$Parser$toToken(i.as),
			at: i.at,
			ax: elm$parser$Parser$toToken(i.ax),
			ay: i.ay,
			V: elm$parser$Parser$toToken(i.V),
			aA: elm$parser$Parser$toAdvancedTrailing(i.aA)
		});
};
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.c);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.f, offset) < 0,
					0,
					{aE: col, g: s0.g, h: s0.h, f: offset, a6: row, c: s0.c});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.f, s.a6, s.aE, s);
	};
};
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var elm$parser$Parser$spaces = elm$parser$Parser$Advanced$spaces;
var author$project$Main$circleLabelNames = elm$parser$Parser$sequence(
	{as: '', at: author$project$Main$circleLabelName, ax: ',', ay: elm$parser$Parser$spaces, V: '', aA: 0});
var author$project$Main$lineLabelNames = elm$parser$Parser$sequence(
	{as: '', at: author$project$Main$lineLabelName, ax: ',', ay: elm$parser$Parser$spaces, V: '', aA: 0});
var author$project$Main$nCircle = author$project$Main$Cir2(
	{d: '', e: ''});
var author$project$Main$nLine = {d: '', e: ''};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$core$Basics$round = _Basics_round;
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var author$project$Main$nameToPosition = F2(
	function (model, s) {
		if (A2(elm$core$Dict$member, s, model.i)) {
			var p = A2(author$project$Main$getP, model, s);
			return p.m;
		} else {
			var w = model.j.M - 10;
			var h = model.j.J - 10;
			return function (d) {
				return {
					a: A2(
						elm$core$Basics$modBy,
						elm$core$Basics$round(w),
						A2(elm$core$Basics$modBy, 13, d) * 47) - (w / 2),
					b: A2(
						elm$core$Basics$modBy,
						elm$core$Basics$round(h),
						A2(elm$core$Basics$modBy, 19, d) * 61) - (h / 2)
				};
			}(
				elm$core$List$sum(
					A2(
						elm$core$List$map,
						elm$core$Char$toCode,
						elm$core$String$toList(s))));
		}
	});
var author$project$Main$newPoints = F6(
	function (model, ns, t, label, a, b) {
		return elm$core$Dict$fromList(
			A2(
				elm$core$List$map,
				function (s) {
					var pos = A2(author$project$Main$nameToPosition, model, s);
					return elm$core$String$isEmpty(label) ? _Utils_Tuple2(
						s,
						author$project$Main$FP(pos)) : ((t === 'line') ? (((a === '0') && (b === '0')) ? _Utils_Tuple2(
						s,
						A2(author$project$Main$FPOL, label, pos)) : _Utils_Tuple2(
						s,
						A3(author$project$Main$POL, label, a, b))) : _Utils_Tuple2(
						s,
						A2(author$project$Main$FPOC, label, pos)));
				},
				ns));
	});
var author$project$Main$pointLabelNames = elm$parser$Parser$sequence(
	{as: '', at: author$project$Main$pointLabelName, ax: ',', ay: elm$parser$Parser$spaces, V: '', aA: 0});
var elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
	});
var elm$core$String$fromFloat = _String_fromNumber;
var elm$parser$Parser$ExpectingEnd = {$: 10};
var elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			elm$core$String$length(s.c),
			s.f) ? A3(elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$parser$Parser$ExpectingFloat = {$: 5};
var elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {aE: s.aE + (newOffset - s.f), g: s.g, h: s.h, f: newOffset, a6: s.a6, c: s.c};
	});
var elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3(elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3(elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2(elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3(elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			elm$parser$Parser$Advanced$consumeExp,
			A2(elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2(elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _n0, s) {
		var endOffset = _n0.a;
		var n = _n0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.f, startOffset) < 0,
				A2(elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2(elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2(elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.c);
		if (floatOffset < 0) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A4(elm$parser$Parser$Advanced$fromInfo, s.a6, s.aE - (floatOffset + s.f), invalid, s.g));
		} else {
			if (_Utils_eq(s.f, floatOffset)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5(elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.f, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							elm$parser$Parser$Advanced$Bad,
							true,
							A2(elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _n1 = elm$core$String$toFloat(
							A3(elm$core$String$slice, s.f, floatOffset, s.c));
						if (_n1.$ === 1) {
							return A2(
								elm$parser$Parser$Advanced$Bad,
								true,
								A2(elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _n1.a;
							return A3(
								elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2(elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3(elm$parser$Parser$Advanced$isAsciiCode, 48, s.f, s.c)) {
			var zeroOffset = s.f + 1;
			var baseOffset = zeroOffset + 1;
			return A3(elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.c) ? A5(
				elm$parser$Parser$Advanced$finalizeInt,
				c.bx,
				c.aL,
				baseOffset,
				A2(elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.c),
				s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.c) ? A5(
				elm$parser$Parser$Advanced$finalizeInt,
				c.bx,
				c.aU,
				baseOffset,
				A3(elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.c),
				s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.c) ? A5(
				elm$parser$Parser$Advanced$finalizeInt,
				c.bx,
				c.aC,
				baseOffset,
				A3(elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.c),
				s) : A6(
				elm$parser$Parser$Advanced$finalizeFloat,
				c.bx,
				c.aI,
				c.aO,
				c.aJ,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				elm$parser$Parser$Advanced$finalizeFloat,
				c.bx,
				c.aI,
				c.aO,
				c.aJ,
				A3(elm$parser$Parser$Advanced$consumeBase, 10, s.f, s.c),
				s);
		}
	};
};
var elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return elm$parser$Parser$Advanced$number(
			{
				aC: elm$core$Result$Err(invalid),
				aI: expecting,
				aJ: elm$core$Result$Ok(elm$core$Basics$identity),
				aL: elm$core$Result$Err(invalid),
				aO: elm$core$Result$Ok(elm$core$Basics$toFloat),
				bx: invalid,
				aU: elm$core$Result$Err(invalid)
			});
	});
var elm$parser$Parser$float = A2(elm$parser$Parser$Advanced$float, elm$parser$Parser$ExpectingFloat, elm$parser$Parser$ExpectingFloat);
var elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var elm$parser$Parser$Advanced$keyword = function (_n0) {
	var kwd = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(kwd);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, kwd, s.f, s.a6, s.aE, s.c);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.c))) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aE: newCol, g: s.g, h: s.h, f: newOffset, a6: newRow, c: s.c});
	};
};
var elm$parser$Parser$keyword = function (kwd) {
	return elm$parser$Parser$Advanced$keyword(
		A2(
			elm$parser$Parser$Advanced$Token,
			kwd,
			elm$parser$Parser$ExpectingKeyword(kwd)));
};
var author$project$Main$statement = function (model) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			elm$parser$Parser$spaces),
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(
											F2(
												function (w, h) {
													return _Utils_update(
														author$project$Main$emptyObjs,
														{
															j: {J: h, M: w}
														});
												})),
										elm$parser$Parser$keyword('set')),
									elm$parser$Parser$spaces),
								elm$parser$Parser$keyword('size')),
							elm$parser$Parser$spaces),
						A2(elm$parser$Parser$ignorer, elm$parser$Parser$float, elm$parser$Parser$spaces)),
					A2(
						elm$parser$Parser$ignorer,
						A2(elm$parser$Parser$ignorer, elm$parser$Parser$float, elm$parser$Parser$spaces),
						elm$parser$Parser$end)),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(
									F2(
										function (ns, _n0) {
											var t = _n0.a;
											var label = _n0.b;
											var _n1 = _n0.c;
											var a = _n1.a;
											var b = _n1.b;
											return _Utils_update(
												author$project$Main$emptyObjs,
												{
													i: A5(
														author$project$Main$newPoints(model),
														ns,
														t,
														label,
														a,
														b)
												});
										})),
								elm$parser$Parser$keyword('point')),
							elm$parser$Parser$spaces),
						A2(elm$parser$Parser$ignorer, author$project$Main$pointLabelNames, elm$parser$Parser$spaces)),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(elm$core$Basics$identity),
										elm$parser$Parser$keyword('on')),
									elm$parser$Parser$spaces),
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$keeper,
												A2(
													elm$parser$Parser$ignorer,
													A2(
														elm$parser$Parser$ignorer,
														elm$parser$Parser$succeed(
															F2(
																function (llabel, ratio) {
																	return _Utils_Tuple3('line', llabel, ratio);
																})),
														elm$parser$Parser$keyword('line')),
													elm$parser$Parser$spaces),
												A2(elm$parser$Parser$ignorer, author$project$Main$lineLabelName, elm$parser$Parser$spaces)),
											elm$parser$Parser$oneOf(
												_List_fromArray(
													[
														A2(
														elm$parser$Parser$keeper,
														A2(
															elm$parser$Parser$keeper,
															elm$parser$Parser$succeed(
																F2(
																	function (l1, l2) {
																		return _Utils_Tuple2(l1, l2);
																	})),
															A2(
																elm$parser$Parser$ignorer,
																author$project$Main$lineLabelName,
																elm$parser$Parser$symbol(':'))),
														A2(
															elm$parser$Parser$ignorer,
															A2(elm$parser$Parser$ignorer, author$project$Main$lineLabelName, elm$parser$Parser$spaces),
															elm$parser$Parser$end)),
														A2(
														elm$parser$Parser$keeper,
														A2(
															elm$parser$Parser$keeper,
															elm$parser$Parser$succeed(
																F2(
																	function (l1, l2) {
																		return _Utils_Tuple2(
																			elm$core$String$fromFloat(l1),
																			elm$core$String$fromFloat(l2));
																	})),
															A2(
																elm$parser$Parser$ignorer,
																elm$parser$Parser$float,
																elm$parser$Parser$symbol(':'))),
														A2(
															elm$parser$Parser$ignorer,
															A2(elm$parser$Parser$ignorer, elm$parser$Parser$float, elm$parser$Parser$spaces),
															elm$parser$Parser$end)),
														A2(
														elm$parser$Parser$keeper,
														elm$parser$Parser$succeed(
															function (_n2) {
																return _Utils_Tuple2('0', '0');
															}),
														elm$parser$Parser$end)
													]))),
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												A2(
													elm$parser$Parser$ignorer,
													elm$parser$Parser$succeed(
														function (clabel) {
															return _Utils_Tuple3(
																'circle',
																clabel,
																_Utils_Tuple2('0', '0'));
														}),
													elm$parser$Parser$keyword('circle')),
												elm$parser$Parser$spaces),
											A2(
												elm$parser$Parser$ignorer,
												A2(elm$parser$Parser$ignorer, author$project$Main$circleLabelName, elm$parser$Parser$spaces),
												elm$parser$Parser$end))
										]))),
								A2(
								elm$parser$Parser$keeper,
								elm$parser$Parser$succeed(
									function (_n3) {
										return _Utils_Tuple3(
											'',
											'',
											_Utils_Tuple2('0', '0'));
									}),
								elm$parser$Parser$end)
							]))),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$succeed(
									F2(
										function (lls, t) {
											return _Utils_update(
												author$project$Main$emptyObjs,
												{
													t: elm$core$Dict$fromList(
														A2(
															elm$core$List$map,
															function (ll) {
																return _Utils_Tuple2(
																	ll,
																	A2(
																		author$project$Main$fromJust,
																		author$project$Main$nLine,
																		author$project$Main$lineNameToLine(ll)));
															},
															lls)),
													p: elm$core$Dict$fromList(
														A2(
															elm$core$List$map,
															function (ll) {
																return _Utils_Tuple2(
																	ll,
																	_Utils_update(
																		author$project$Main$defaultLSta,
																		{H: t}));
															},
															lls))
												});
										})),
								elm$parser$Parser$keyword('connect')),
							elm$parser$Parser$spaces),
						A2(elm$parser$Parser$ignorer, author$project$Main$lineLabelNames, elm$parser$Parser$spaces)),
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$succeed(
											function (_n4) {
												return true;
											}),
										elm$parser$Parser$keyword('dashed')),
									elm$parser$Parser$spaces),
								elm$parser$Parser$end),
								A2(
								elm$parser$Parser$keeper,
								elm$parser$Parser$succeed(
									function (_n5) {
										return false;
									}),
								elm$parser$Parser$end)
							]))),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$keeper,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										A2(
											elm$parser$Parser$ignorer,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(
													F4(
														function (_n6, _n7, isPositive, pn) {
															var t1 = _n6.a;
															var s1 = _n6.b;
															var t2 = _n7.a;
															var s2 = _n7.b;
															var _n8 = _Utils_Tuple2(t1, t2);
															_n8$4:
															while (true) {
																switch (_n8.a) {
																	case 'line':
																		switch (_n8.b) {
																			case 'line':
																				return _Utils_update(
																					author$project$Main$emptyObjs,
																					{
																						i: A2(
																							elm$core$Dict$singleton,
																							pn,
																							A2(author$project$Main$P2L, s1, s2))
																					});
																			case 'circle':
																				return _Utils_update(
																					author$project$Main$emptyObjs,
																					{
																						i: A2(
																							elm$core$Dict$singleton,
																							pn,
																							A3(author$project$Main$PCL, s2, s1, isPositive))
																					});
																			default:
																				break _n8$4;
																		}
																	case 'circle':
																		switch (_n8.b) {
																			case 'line':
																				return _Utils_update(
																					author$project$Main$emptyObjs,
																					{
																						i: A2(
																							elm$core$Dict$singleton,
																							pn,
																							A3(author$project$Main$PCL, s1, s2, isPositive))
																					});
																			case 'circle':
																				return _Utils_update(
																					author$project$Main$emptyObjs,
																					{
																						i: A2(
																							elm$core$Dict$singleton,
																							pn,
																							A3(author$project$Main$P2C, s1, s2, isPositive))
																					});
																			default:
																				break _n8$4;
																		}
																	default:
																		break _n8$4;
																}
															}
															return author$project$Main$emptyObjs;
														})),
												elm$parser$Parser$keyword('intersection')),
											elm$parser$Parser$spaces),
										elm$parser$Parser$keyword('of')),
									elm$parser$Parser$spaces),
								A2(
									elm$parser$Parser$ignorer,
									elm$parser$Parser$oneOf(
										_List_fromArray(
											[
												A2(
												elm$parser$Parser$keeper,
												A2(
													elm$parser$Parser$ignorer,
													A2(
														elm$parser$Parser$ignorer,
														elm$parser$Parser$succeed(
															function (s) {
																return _Utils_Tuple2('line', s);
															}),
														elm$parser$Parser$keyword('line')),
													elm$parser$Parser$spaces),
												author$project$Main$lineLabelName),
												A2(
												elm$parser$Parser$keeper,
												A2(
													elm$parser$Parser$ignorer,
													A2(
														elm$parser$Parser$ignorer,
														elm$parser$Parser$succeed(
															function (s) {
																return _Utils_Tuple2('circle', s);
															}),
														elm$parser$Parser$keyword('circle')),
													elm$parser$Parser$spaces),
												author$project$Main$circleLabelName)
											])),
									elm$parser$Parser$spaces)),
							A2(
								elm$parser$Parser$ignorer,
								elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												A2(
													elm$parser$Parser$ignorer,
													elm$parser$Parser$succeed(
														function (s) {
															return _Utils_Tuple2('line', s);
														}),
													elm$parser$Parser$keyword('line')),
												elm$parser$Parser$spaces),
											author$project$Main$lineLabelName),
											A2(
											elm$parser$Parser$keeper,
											A2(
												elm$parser$Parser$ignorer,
												A2(
													elm$parser$Parser$ignorer,
													elm$parser$Parser$succeed(
														function (s) {
															return _Utils_Tuple2('circle', s);
														}),
													elm$parser$Parser$keyword('circle')),
												elm$parser$Parser$spaces),
											author$project$Main$circleLabelName)
										])),
								elm$parser$Parser$spaces)),
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										A2(
											elm$parser$Parser$ignorer,
											elm$parser$Parser$oneOf(
												_List_fromArray(
													[
														A2(
														elm$parser$Parser$keeper,
														elm$parser$Parser$succeed(
															function (_n9) {
																return true;
															}),
														elm$parser$Parser$symbol('+')),
														A2(
														elm$parser$Parser$keeper,
														elm$parser$Parser$succeed(
															function (_n10) {
																return false;
															}),
														elm$parser$Parser$symbol('-')),
														elm$parser$Parser$succeed(true)
													])),
											elm$parser$Parser$spaces),
										elm$parser$Parser$keyword('as')),
									elm$parser$Parser$spaces),
								elm$parser$Parser$keyword('point')),
							elm$parser$Parser$spaces)),
					A2(
						elm$parser$Parser$ignorer,
						A2(elm$parser$Parser$ignorer, author$project$Main$pointLabelName, elm$parser$Parser$spaces),
						elm$parser$Parser$end)),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$ignorer,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										A2(
											elm$parser$Parser$ignorer,
											elm$parser$Parser$succeed(
												F3(
													function (pl, ll, pn) {
														return _Utils_update(
															author$project$Main$emptyObjs,
															{
																i: A2(
																	elm$core$Dict$singleton,
																	pn,
																	A2(author$project$Main$POLP, pl, ll))
															});
													})),
											elm$parser$Parser$keyword('projection')),
										elm$parser$Parser$spaces),
									elm$parser$Parser$keyword('of')),
								elm$parser$Parser$spaces),
							A2(
								elm$parser$Parser$ignorer,
								A2(
									elm$parser$Parser$ignorer,
									A2(elm$parser$Parser$ignorer, author$project$Main$pointLabelName, elm$parser$Parser$spaces),
									elm$parser$Parser$keyword('on')),
								elm$parser$Parser$spaces)),
						A2(
							elm$parser$Parser$ignorer,
							A2(
								elm$parser$Parser$ignorer,
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										A2(elm$parser$Parser$ignorer, author$project$Main$lineLabelName, elm$parser$Parser$spaces),
										elm$parser$Parser$keyword('as')),
									elm$parser$Parser$spaces),
								elm$parser$Parser$keyword('point')),
							elm$parser$Parser$spaces)),
					A2(
						elm$parser$Parser$ignorer,
						A2(elm$parser$Parser$ignorer, author$project$Main$pointLabelName, elm$parser$Parser$spaces),
						elm$parser$Parser$end)),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(
								function (_n11) {
									var t = _n11.a;
									var ns = _n11.b;
									switch (t) {
										case 'point':
											return _Utils_update(
												author$project$Main$emptyObjs,
												{
													u: elm$core$Dict$fromList(
														A2(
															elm$core$List$map,
															function (s) {
																return _Utils_Tuple2(
																	s,
																	_Utils_update(
																		author$project$Main$defaultPSta,
																		{l: true}));
															},
															ns))
												});
										case 'line':
											return _Utils_update(
												author$project$Main$emptyObjs,
												{
													p: elm$core$Dict$fromList(
														A2(
															elm$core$List$map,
															function (s) {
																return _Utils_Tuple2(
																	s,
																	_Utils_update(
																		author$project$Main$defaultLSta,
																		{l: true}));
															},
															ns))
												});
										default:
											return author$project$Main$emptyObjs;
									}
								}),
							elm$parser$Parser$keyword('hide')),
						elm$parser$Parser$spaces),
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										elm$parser$Parser$keeper,
										A2(
											elm$parser$Parser$ignorer,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(
													function (ns) {
														return _Utils_Tuple2('point', ns);
													}),
												elm$parser$Parser$keyword('point')),
											elm$parser$Parser$spaces),
										author$project$Main$pointLabelNames),
										A2(
										elm$parser$Parser$keeper,
										A2(
											elm$parser$Parser$ignorer,
											A2(
												elm$parser$Parser$ignorer,
												elm$parser$Parser$succeed(
													function (ns) {
														return _Utils_Tuple2('line', ns);
													}),
												elm$parser$Parser$keyword('line')),
											elm$parser$Parser$spaces),
										author$project$Main$lineLabelNames)
									])),
							elm$parser$Parser$spaces),
						elm$parser$Parser$end)),
					A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(
								function (cs) {
									return _Utils_update(
										author$project$Main$emptyObjs,
										{
											s: elm$core$Dict$fromList(
												A2(
													elm$core$List$map,
													function (c) {
														return _Utils_Tuple2(
															c,
															A2(
																author$project$Main$fromJust,
																author$project$Main$nCircle,
																author$project$Main$circleNameToCircle(c)));
													},
													cs))
										});
								}),
							elm$parser$Parser$keyword('circle')),
						elm$parser$Parser$spaces),
					A2(
						elm$parser$Parser$ignorer,
						A2(elm$parser$Parser$ignorer, author$project$Main$circleLabelNames, elm$parser$Parser$spaces),
						elm$parser$Parser$end)),
					A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						function (_n13) {
							return author$project$Main$emptyObjs;
						}),
					elm$parser$Parser$end),
					elm$parser$Parser$problem('Cannot understand ')
				])));
};
var elm$core$String$lines = _String_lines;
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {aE: col, bM: problem, a6: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.a6, p.aE, p.bM);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0;
		var _n1 = parse(
			{aE: 1, g: _List_Nil, h: 1, f: 0, a6: 1, c: src});
		if (!_n1.$) {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$Main$interpret = F2(
	function (model, input) {
		var inputLines = elm$core$String$lines(input);
		var len = elm$core$List$length(inputLines);
		var numL = A2(elm$core$List$range, 1, len);
		return A2(
			author$project$Main$collectAndCheck,
			model,
			A3(
				elm$core$List$map2,
				F2(
					function (n, s) {
						var _n0 = A2(
							elm$parser$Parser$run,
							author$project$Main$statement(model),
							s);
						if (!_n0.$) {
							var objs = _n0.a;
							return objs;
						} else {
							var errInfo = _n0.a;
							return _Utils_update(
								author$project$Main$emptyObjs,
								{
									r: 'Line ' + (elm$core$String$fromInt(n) + (': ' + (author$project$Main$showError(errInfo) + ('\"' + (s + '\"')))))
								});
						}
					}),
				numL,
				inputLines));
	});
var author$project$Main$plot = function (model) {
	var input = model.O;
	var info = A2(author$project$Main$interpret, model, input);
	return _Utils_update(
		model,
		{s: info.s, o: info.o, t: info.t, p: info.p, i: info.i, r: info.r, u: info.u, j: info.j});
};
var author$project$Main$updateHelp = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var obj = msg.a;
				var xy = msg.b;
				return _Utils_update(
					model,
					{
						I: elm$core$Maybe$Just(
							A3(author$project$Main$Drag, obj, xy, xy))
					});
			case 1:
				var xy = msg.a;
				return _Utils_update(
					model,
					{
						I: A2(
							elm$core$Maybe$map,
							function (_n1) {
								var start = _n1.V;
								var obj = _n1.af;
								return A3(author$project$Main$Drag, obj, start, xy);
							},
							model.I)
					});
			case 2:
				return _Utils_update(
					model,
					{
						I: elm$core$Maybe$Nothing,
						o: author$project$Main$getLabels(model),
						i: author$project$Main$getPoints(model)
					});
			case 3:
				var obj = msg.a;
				return _Utils_update(
					model,
					{
						Y: elm$core$Maybe$Just(obj)
					});
			case 4:
				var obj = msg.a;
				return _Utils_update(
					model,
					{Y: elm$core$Maybe$Nothing});
			case 6:
				var input = msg.a;
				return _Utils_update(
					model,
					{O: input});
			case 7:
				return author$project$Main$plot(model);
			case 8:
				var objs = {s: model.s, o: model.o, t: model.t, p: model.p, i: model.i, r: '', u: model.u, j: model.j};
				var org = '#+TITLE: \n#+OPTIONS: toc:nil\n#+INFOJS_OPT: path:/js/geo2d_show.js\n#+LINK_UP: ../geo2d.html\ndescriptions\n#+BEGIN_HTML\n<div id=\"elm\"></div>\n<script>\nvar app = Elm.Main.init({\nnode: document.getElementById(\'elm\')\n,flags:{input:' + ('\'' + (A2(
					elm$core$String$join,
					'\\n',
					elm$core$String$lines(model.O)) + ('\',objsStr:\'' + (A2(
					elm$json$Json$Encode$encode,
					0,
					author$project$Main$encodeObjs(objs)) + '\'}\n})\n</script>\n#+END_HTML'))));
				return _Utils_update(
					model,
					{
						r: 'input:' + ('\'' + (A2(
							elm$core$String$join,
							'\\n',
							elm$core$String$lines(model.O)) + ('\',objsStr:\'' + (A2(
							elm$json$Json$Encode$encode,
							0,
							author$project$Main$encodeObjs(objs)) + '\''))))
					});
			default:
				return model;
		}
	});
var author$project$Main$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(
			A2(author$project$Main$updateHelp, msg, model),
			elm$core$Platform$Cmd$none);
	});
var author$project$Main$Export = {$: 8};
var author$project$Main$Plot = {$: 7};
var author$project$Main$Change = function (a) {
	return {$: 6, a: a};
};
var author$project$Main$change = function (input) {
	return author$project$Main$Change(input);
};
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var author$project$Main$examples = A2(
	elm$core$List$map,
	elm$html$Html$text,
	_List_fromArray(
		['set size 500 300\n', 'point A,B,C\n', 'connect AB,BC,AC\n', 'point D on line AB\n', 'point E on line BC 1:1\n', 'point F on circle ABC\n', 'connect AE dashed\n', 'connect CD\n', 'intersection of line AE line CD as point I\n', 'intersection of line AE circle ACD as point I\n', 'intersection of circle ABE circle ACD + as point I\n', 'intersection of circle ABE circle ACD - as point I\n', 'circle ABC\n', 'circle I:IA\n', 'projection of D on CB as point P\n', 'hide point I\n', 'hide line CD\n']));
var author$project$Main$getCList = function (model) {
	var circles = author$project$Main$getCircles(model);
	return A2(
		elm$core$Dict$map,
		F2(
			function (label, circle) {
				return A2(author$project$Main$getC, model, label);
			}),
		circles);
};
var author$project$Main$getLList = function (model) {
	var lines = author$project$Main$getLines(model);
	return A2(
		elm$core$Dict$map,
		F2(
			function (label, line) {
				return A2(author$project$Main$getL, model, label);
			}),
		lines);
};
var author$project$Main$getPList = function (model) {
	var points = author$project$Main$getPoints(model);
	return A2(
		elm$core$Dict$map,
		F2(
			function (label, point) {
				return A2(author$project$Main$getP, model, label);
			}),
		points);
};
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$circle = elm$svg$Svg$trustedNode('circle');
var elm$svg$Svg$g = elm$svg$Svg$trustedNode('g');
var elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var author$project$Main$renderCircles = function (clist) {
	return A2(
		elm$core$List$map,
		function (_n0) {
			var label = _n0.a;
			var center = _n0.b.C;
			var radius = _n0.b.F;
			return A2(
				elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$circle,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$style('stroke:black;stroke-width:3;'),
								elm$svg$Svg$Attributes$cx(
								elm$core$String$fromFloat(center.a)),
								elm$svg$Svg$Attributes$cy(
								elm$core$String$fromFloat(center.b)),
								elm$svg$Svg$Attributes$r(
								elm$core$String$fromFloat(radius)),
								elm$svg$Svg$Attributes$fill('none')
							]),
						_List_Nil)
					]));
		},
		elm$core$Dict$toList(clist));
};
var elm$svg$Svg$line = elm$svg$Svg$trustedNode('line');
var elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var author$project$Main$renderLines = function (llist) {
	return A2(
		elm$core$List$map,
		function (_n0) {
			var label = _n0.a;
			var twoPos = _n0.b.z;
			var extraState = _n0.b.w;
			var _n1 = function () {
				if (!extraState.$) {
					var es = extraState.a;
					return _Utils_Tuple2(es.H, es.l);
				} else {
					return _Utils_Tuple2(false, false);
				}
			}();
			var dashed = _n1.a;
			var hidden = _n1.b;
			return A2(
				elm$svg$Svg$g,
				_List_Nil,
				(!hidden) ? _List_fromArray(
					[
						A2(
						elm$svg$Svg$line,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$style(
								'stroke:black;stroke-width:3;' + (dashed ? 'stroke-dasharray:10,6' : '')),
								elm$svg$Svg$Attributes$x1(
								elm$core$String$fromFloat(twoPos.d.a)),
								elm$svg$Svg$Attributes$y1(
								elm$core$String$fromFloat(twoPos.d.b)),
								elm$svg$Svg$Attributes$x2(
								elm$core$String$fromFloat(twoPos.e.a)),
								elm$svg$Svg$Attributes$y2(
								elm$core$String$fromFloat(twoPos.e.b))
							]),
						_List_Nil)
					]) : _List_Nil);
		},
		elm$core$Dict$toList(llist));
};
var author$project$Main$MOut = function (a) {
	return {$: 4, a: a};
};
var author$project$Main$MOver = function (a) {
	return {$: 3, a: a};
};
var author$project$Main$DragStart = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var elm$json$Json$Decode$map6 = _Json_map6;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event = F6(
	function (keys, button, clientPos, offsetPos, pagePos, screenPos) {
		return {bf: button, bi: clientPos, bz: keys, bD: offsetPos, bH: pagePos, bO: screenPos};
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$BackButton = 4;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ErrorButton = 0;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ForwardButton = 5;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MainButton = 1;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MiddleButton = 2;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$SecondButton = 3;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId = function (id) {
	switch (id) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		default:
			return 0;
	}
};
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder = A2(
	elm$json$Json$Decode$map,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId,
	A2(elm$json$Json$Decode$field, 'button', elm$json$Json$Decode$int));
var mpizenberg$elm_pointer_events$Internal$Decode$clientPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'clientX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'clientY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$Keys = F3(
	function (alt, ctrl, shift) {
		return {bc: alt, bl: ctrl, bP: shift};
	});
var mpizenberg$elm_pointer_events$Internal$Decode$keys = A4(
	elm$json$Json$Decode$map3,
	mpizenberg$elm_pointer_events$Internal$Decode$Keys,
	A2(elm$json$Json$Decode$field, 'altKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'ctrlKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'shiftKey', elm$json$Json$Decode$bool));
var mpizenberg$elm_pointer_events$Internal$Decode$offsetPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'offsetX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'offsetY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$pagePos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'pageX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'pageY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$screenPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'screenX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'screenY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder = A7(elm$json$Json$Decode$map6, mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event, mpizenberg$elm_pointer_events$Internal$Decode$keys, mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder, mpizenberg$elm_pointer_events$Internal$Decode$clientPos, mpizenberg$elm_pointer_events$Internal$Decode$offsetPos, mpizenberg$elm_pointer_events$Internal$Decode$pagePos, mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions = F3(
	function (event, options, tag) {
		return A2(
			elm$html$Html$Events$custom,
			event,
			A2(
				elm$json$Json$Decode$map,
				function (ev) {
					return {
						P: tag(ev),
						aw: options.aw,
						az: options.az
					};
				},
				mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder));
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$stopOptions = {aw: true, az: true};
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onDown = A2(mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mousedown', mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$stopOptions);
var author$project$Main$onMouseDown = function (obj) {
	return mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onDown(
		function (event) {
			var _n0 = event.bH;
			var x = _n0.a;
			var y = _n0.b;
			return A2(
				author$project$Main$DragStart,
				obj,
				{a: x, b: y});
		});
};
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onMouseOut = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseout',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$Events$onMouseOver = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'mouseover',
		elm$json$Json$Decode$succeed(msg));
};
var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
var elm$svg$Svg$text_ = elm$svg$Svg$trustedNode('text');
var elm$svg$Svg$Attributes$cursor = _VirtualDom_attribute('cursor');
var elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var author$project$Main$renderPoints = function (plist) {
	return A2(
		elm$core$List$map,
		function (_n0) {
			var label = _n0.a;
			var pos = _n0.b.m;
			var labelPos = _n0.b.D;
			var state = _n0.b.G;
			var extraState = _n0.b.w;
			return A2(
				elm$svg$Svg$g,
				_List_Nil,
				function () {
					var hidden = function () {
						if (!extraState.$) {
							var es = extraState.a;
							return es.l;
						} else {
							return false;
						}
					}();
					if (!labelPos.$) {
						var lpos = labelPos.a;
						return (!hidden) ? _List_fromArray(
							[
								A2(
								elm$svg$Svg$circle,
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$cx(
										elm$core$String$fromFloat(pos.a)),
										elm$svg$Svg$Attributes$cy(
										elm$core$String$fromFloat(pos.b)),
										elm$svg$Svg$Attributes$r(
										(state.v || state.y) ? '6' : '4'),
										elm$svg$Svg$Attributes$fill(
										(state.v || state.y) ? 'red' : 'black'),
										elm$svg$Svg$Attributes$cursor(
										state.v ? 'move' : 'default'),
										author$project$Main$onMouseDown(
										author$project$Main$P(label)),
										elm$html$Html$Events$onMouseOver(
										author$project$Main$MOver(
											author$project$Main$P(label))),
										elm$html$Html$Events$onMouseOut(
										author$project$Main$MOut(
											author$project$Main$P(label)))
									]),
								_List_Nil),
								A2(
								elm$svg$Svg$text_,
								_List_fromArray(
									[
										elm$svg$Svg$Attributes$x(
										elm$core$String$fromFloat(pos.a + lpos.a)),
										elm$svg$Svg$Attributes$y(
										elm$core$String$fromFloat((-pos.b) - lpos.b)),
										elm$svg$Svg$Attributes$cursor('move'),
										elm$svg$Svg$Attributes$transform('scale(1,-1)'),
										elm$svg$Svg$Attributes$fill(
										(state.v || state.y) ? 'red' : 'black'),
										author$project$Main$onMouseDown(
										author$project$Main$Label(label))
									]),
								_List_fromArray(
									[
										elm$svg$Svg$text(label)
									]))
							]) : _List_Nil;
					} else {
						return _List_Nil;
					}
				}());
		},
		elm$core$Dict$toList(plist));
};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$textarea = _VirtualDom_node('textarea');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var author$project$Main$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'touch-action', 'none')
			]),
		_List_fromArray(
			[
				A2(
				elm$svg$Svg$svg,
				_List_fromArray(
					[
						elm$svg$Svg$Attributes$width(
						elm$core$String$fromFloat(model.j.M)),
						elm$svg$Svg$Attributes$height(
						elm$core$String$fromFloat(model.j.J))
					]),
				_List_fromArray(
					[
						A2(
						elm$svg$Svg$g,
						_List_fromArray(
							[
								elm$svg$Svg$Attributes$transform(
								'translate(' + (elm$core$String$fromFloat(model.j.M / 2) + (',' + (elm$core$String$fromFloat(model.j.J / 2) + ') scale(1,-1)'))))
							]),
						_Utils_ap(
							author$project$Main$renderPoints(
								author$project$Main$getPList(model)),
							_Utils_ap(
								author$project$Main$renderLines(
									author$project$Main$getLList(model)),
								author$project$Main$renderCircles(
									author$project$Main$getCList(model)))))
					])),
				A2(
				elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$textarea,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'width', '400px'),
								A2(elm$html$Html$Attributes$style, 'height', '200px'),
								A2(elm$html$Html$Attributes$style, 'rows', '20'),
								A2(elm$html$Html$Attributes$style, 'cols', '30'),
								A2(elm$html$Html$Attributes$style, 'background-color', '#595b5b'),
								A2(elm$html$Html$Attributes$style, 'color', '#fff'),
								elm$html$Html$Attributes$placeholder('input commands here'),
								elm$html$Html$Attributes$value(model.O),
								elm$html$Html$Events$onInput(author$project$Main$change)
							]),
						_List_Nil),
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Main$Plot)
							]),
						_List_fromArray(
							[
								elm$html$Html$text('plot')
							])),
						A2(
						elm$html$Html$button,
						_List_fromArray(
							[
								elm$html$Html$Events$onClick(author$project$Main$Export)
							]),
						_List_fromArray(
							[
								elm$html$Html$text('export')
							]))
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'color', 'red'),
						A2(elm$html$Html$Attributes$style, 'white-space', 'pre-line')
					]),
				_List_fromArray(
					[
						elm$html$Html$text(model.r)
					])),
				elm$html$Html$text('Input examples:'),
				A2(
				elm$html$Html$ul,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'color', 'blue'),
						A2(elm$html$Html$Attributes$style, 'white-space', 'pre-line')
					]),
				author$project$Main$examples)
			]));
};
var elm$browser$Browser$element = _Browser_element;
var author$project$Main$main = elm$browser$Browser$element(
	{bw: author$project$Main$init, bR: author$project$Main$subscriptions, bX: author$project$Main$update, bZ: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	A2(
		elm$json$Json$Decode$andThen,
		function (objsStr) {
			return A2(
				elm$json$Json$Decode$andThen,
				function (input) {
					return elm$json$Json$Decode$succeed(
						{O: input, aT: objsStr});
				},
				A2(elm$json$Json$Decode$field, 'input', elm$json$Json$Decode$string));
		},
		A2(elm$json$Json$Decode$field, 'objsStr', elm$json$Json$Decode$string)))(0)}});}(this));