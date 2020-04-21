"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2020 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.Monad = function(ctx, value, err)
{
	this.val = value;
	this.err = null;
};
Object.assign(Runtime.Monad.prototype,
{
	/**
	 * Return attr of object
	 */
	attr: function(ctx, attr_name)
	{
		if (this.val == null || this.err != null)
		{
			return this;
		}
		return new Runtime.Monad(ctx, Runtime.rtl.attr(ctx, this.val, Runtime.Collection.from([attr_name]), null));
	},
	/**
	 * Call function on value
	 */
	call: function(ctx, f)
	{
		if (this.val == null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			res = f(ctx, this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return new Runtime.Monad(ctx, res, err);
	},
	/**
	 * Call async function on value
	 */
	callAsync: function(ctx, f)
	{
		var res,err;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				if (this.val == null || this.err != null)
				{
					return __async_t.ret(ctx, this);
				}
				res = null;
				err = null;
				return __async_t.jump(ctx, "1");
			}
			/* Start Try */
			else if (__async_t.pos(ctx) == "1")
			{
				__async_t = __async_t.catch_push("1.0");
				return __async_t.jump(ctx, "1.1").call(ctx, f(ctx, this.val),"__v0");
			}
			else if (__async_t.pos(ctx) == "1.1")
			{
				res = __async_t.getVar(ctx, "__v0");
				return __async_t.catch_pop().jump(ctx, "2");
			}
			/* Start Catch */
			else if (__async_t.pos(ctx) == "1.0")
			{
				if (_ex instanceof Runtime.Exceptions.RuntimeException)
				{
					var e = _ex;
					
					res = null;
					err = e;
				}
				else
				{
					throw _ex;
				}
				return __async_t.jump(ctx, "2");
			}
			/* End Catch */
			else if (__async_t.pos(ctx) == "2")
			{
				return __async_t.ret(ctx, new Runtime.Monad(ctx, res, err));
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Call method on value
	 */
	callMethod: function(ctx, method_name, args)
	{
		if (args == undefined) args = null;
		if (this.val == null || this.err != null)
		{
			return this;
		}
		var res = null;
		var err = null;
		try
		{
			var f = Runtime.rtl.method(ctx, this.val.getClassName(ctx), method_name);
			if (args != null)
			{
				f = Runtime.rtl.apply(ctx, f, args);
			}
			res = f(ctx, this.val);
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Exceptions.RuntimeException)
			{
				var e = _ex;
				
				res = null;
				err = e;
			}
			else
			{
				throw _ex;
			}
		}
		return new Runtime.Monad(ctx, res, err);
	},
	/**
	 * Call async method on value
	 */
	callMethodAsync: function(ctx, method_name, args)
	{
		var res,err,f;
		return (__async_t) =>
		{
			if (__async_t.pos(ctx) == "0")
			{
				if (this.val == null || this.err != null)
				{
					return __async_t.ret(ctx, this);
				}
				res = null;
				err = null;
				return __async_t.jump(ctx, "1");
			}
			/* Start Try */
			else if (__async_t.pos(ctx) == "1")
			{
				__async_t = __async_t.catch_push("1.0");
				f = Runtime.rtl.method(ctx, this.val.getClassName(ctx), method_name);
				if (args != null)
				{
					f = Runtime.rtl.apply(ctx, f, args);
				}
				return __async_t.jump(ctx, "1.1").call(ctx, f(ctx, this.val),"__v0");
			}
			else if (__async_t.pos(ctx) == "1.1")
			{
				res = __async_t.getVar(ctx, "__v0");
				return __async_t.catch_pop().jump(ctx, "2");
			}
			/* Start Catch */
			else if (__async_t.pos(ctx) == "1.0")
			{
				if (_ex instanceof Runtime.Exceptions.RuntimeException)
				{
					var e = _ex;
					
					res = null;
					err = e;
				}
				else
				{
					throw _ex;
				}
				return __async_t.jump(ctx, "2");
			}
			/* End Catch */
			else if (__async_t.pos(ctx) == "2")
			{
				return __async_t.ret(ctx, new Runtime.Monad(ctx, res, err));
			}
			return __async_t.ret_void(ctx);
		};
	},
	/**
	 * Call function on monad
	 */
	monad: function(ctx, f)
	{
		return f(ctx, this);
	},
	/**
	 * Returns value
	 */
	value: function(ctx)
	{
		if (this.val == null || this.err != null)
		{
			return null;
		}
		return this.val;
	},
	_init: function(ctx)
	{
		this.val = null;
		this.err = null;
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.Monad)
		{
			this.val = o.val;
			this.err = o.err;
		}
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "val")this.val = v;
		else if (k == "err")this.err = v;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "val")return this.val;
		else if (k == "err")return this.err;
	},
	getClassName: function(ctx)
	{
		return "Runtime.Monad";
	},
});
Object.assign(Runtime.Monad,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Monad";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function(ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Monad",
			"name": "Runtime.Monad",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|2)==2)
		{
			a.push("val");
			a.push("err");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "val") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Monad",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "err") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.Monad",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Monad);