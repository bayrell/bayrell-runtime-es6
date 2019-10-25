"use strict;"
var use = (typeof Runtime != 'undefined' && typeof Runtime.rtl != 'undefined') ? Runtime.rtl.find_class : null;
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
var use = function(s){return Runtime.rtl.find_class(s);}
var isBrowser=function(){return typeof window !== "undefined" && this === window;}
if (typeof Runtime == 'undefined') Runtime = {};

Runtime._Map = function(__ctx, map)
{
	this._map = {};
	if (map != undefined && typeof map == 'object')
	{
		if (map instanceof Runtime.Dict)
		{
			for (var i in map._map)
			{
				this._map[i] = map._map[i];
			}
		}
		else
		{
			for (var i in map)
			{
				this._map["|" + i] = map[i];
			}
		}
	}
	this.__uq__ = Symbol();
	return this;
}
Runtime._Map.prototype = Object.create(Map.prototype);
Runtime._Map.prototype.constructor = Runtime._Map;
Object.assign(Runtime._Map.prototype,
{
	toStr: function(value)
	{ 
		return use("Runtime.rtl").toStr(value);
	},
	toObject: function()
	{
		var obj = {};
		for (var key in this._map)
		{
			obj[key.substring(1)] = this._map[key];
		}
		return obj;
	},
	getClassName: function(){ return "Runtime._Map"; },
});
Object.assign(Runtime._Map,
{
	from: function(map)
	{
		var res = this.Instance(null);
		for (var i in map)
		{
			res._map["|" + i] = map[i];
		}
		return res;
	},
	getCurrentNamespace: function(){ return "Runtime"; },
	getCurrentClassName: function(){ return "Runtime._Map"; },
	getParentClassName: function(){ return ""; },
});
Runtime.Dict = function(__ctx)
{
	Runtime._Map.apply(this, arguments);
};
Runtime.Dict.prototype = Object.create(Runtime._Map.prototype);
Runtime.Dict.prototype.constructor = Runtime.Dict;
Object.assign(Runtime.Dict.prototype,
{
	/**
	 * Returns copy of Dict
	 * @param int pos - position
	 */
	copy: function(__ctx)
	{
		var new_obj = this.constructor.Instance(__ctx);
		new_obj._map = Object.assign({}, this._map);
		return new_obj;
	},
	/**
	 * Convert to dict
	 */
	toDict: function(__ctx)
	{
		var Dict = use ("Runtime.Dict");
		return new Dict(__ctx, this);
	},
	/**
	 * Convert to dict
	 */
	toMap: function(__ctx)
	{
		var Map = use ("Runtime.Map");
		return new Map(__ctx, this);
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	contains: function(__ctx, key)
	{
		key = this.toStr(key);
		return typeof this._map["|" + key] != "undefined";
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(__ctx, key)
	{
		return this.contains(__ctx, key);
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @param T default_value
	 * @return T
	 */
	get: function(__ctx, key, default_value)
	{
		key = this.toStr(key);
		var val = this._map["|" + key];
		if (typeof val == "undefined") return default_value;
		return val;
	},
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param string key - position
	 * @return T
	 */
	item: function(__ctx, key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] == "undefined")
		{
			var _KeyNotFound = use("Runtime.Exceptions.KeyNotFound");
			throw new _KeyNotFound(key);
		}
		var val = this._map["|" + key];
		if (val === null || typeof val == "undefined") return null;
		return val;
	},
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	setIm: function(__ctx, key, value)
	{
		var res = this.copy(__ctx);
		key = this.toStr(key);
		res._map["|" + key] = value;
		return res;
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	removeIm: function(__ctx, key)
	{
		key = this.toStr(key);
		if (typeof this._map["|" + key] != "undefined")
		{
			var res = this.copy();
			delete res._map["|" + key];
			return res;
		}
		return this;
	},
	/**
	 * Returns vector of the keys
	 * @return Collection<string>
	 */
	keys: function(__ctx)
	{
		var res = new Runtime.Collection(__ctx);
		for (var key in this._map) res.push(key.substring(1));
		return res;
	},
	/**
	 * Returns vector of the values
	 * @return Collection<T>
	 */
	values: function(__ctx)
	{
		var res = new Runtime.Collection(__ctx);
		for (var key in this._map) res.push( this._map[key] );
		return res;
	},
	/**
	 * Call function map
	 * @param fn f
	 * @return Dict
	 */
	map: function(__ctx, f)
	{
		var obj = this.constructor.Instance(__ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var new_val = f(__ctx, this._map[key], new_key);
			obj.set(key, new_val);
		}
		return obj;
	},
	/**
	 * Filter items
	 * @param fn f
	 * @return Collection
	 */
	filter: function(__ctx, f)
	{
		var obj = this.contstructor.Instance(__ctx);
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			var flag = f(__ctx, value, new_key);
			if (flag) obj.set(key, value);
		}
		return obj;
	},
	/**
	 * Call function for each item
	 * @param fn f
	 */
	each: function(__ctx, f)
	{
		for (var key in this._map)
		{
			var new_key = key.substring(1);
			var value = this._map[key];
			f(__ctx, value, new_key);
		}
	},
	/**
	 * Transition Dict to Collection
	 * @param fn f
	 * @return Collection
	 */
	transition: function(__ctx, f)
	{
		var Collection = use("Runtime.Collection");
		var arr = new Collection(__ctx);
		for (var key in this._map)
		{
			var new_value = f(__ctx, this._map[key], key.substring(1));
			Array.prototype.push.call(arr, new_value);
		}
		return arr;
	},
	/**
	 * 	
	 * @param fn f
	 * @param var init_value
	 * @return init_value
	 */
	reduce: function(__ctx, f, init_value)
	{
		for (var key in this._map)
		{
			init_value = f(__ctx, init_value, this._map[key], key.substring(1));
		}
		return init_value;
	},
	/**
	 * Add values from other map
	 * @param Dict<T> map
	 * @return self
	 */
	concat: function(__ctx, map)
	{
		if (map == undefined) map = null;
		if (map == null) return this;
		var res = this.copy(__ctx);
		for (var key in map._map)
		{
			res._map[key] = map._map[key];
		}
		return res;
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Runtime.Dict)
		{
		}
		Runtime._Map.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		Runtime._Map.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		return Runtime._Map.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.Dict";
	},
});
Object.assign(Runtime.Dict, Runtime._Map);
Object.assign(Runtime.Dict,
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	Instance: function(__ctx)
	{
		return new Runtime.Dict(__ctx);
	},
	/**
	 * Returns new Instance
	 * @return Object
	 */
	create: function(__ctx, obj)
	{
		return new (Function.prototype.bind.apply(this, [null, __ctx, obj]));
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Dict";
	},
	getParentClassName: function()
	{
		return "Runtime._Map";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.Dict",
			"name": "Runtime.Dict",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(__ctx,field_name)
	{
		return null;
	},
	getMethodsList: function(__ctx)
	{
		var a = [
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(__ctx,field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Dict);