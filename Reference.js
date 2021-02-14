"use strict;"
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
Runtime.Reference = function(ref)
{
	if (ref == undefined) ref = null;
	Runtime.BaseObject.call(this);
	this.ref = ref;
};
Runtime.Reference.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Reference.prototype.constructor = Runtime.Reference;
Object.assign(Runtime.Reference.prototype,
{
	/**
	 * Assign and clone data from other object
	 * @param BaseObject obj
	 */
	assignObject1: function(obj)
	{
		if (obj instanceof Runtime.Reference)
		{
			this.uq = obj.uq;
			this.ref = this.ref;
		}
		Runtime.BaseObject.prototype.assignObject1.call(this, obj);
	},
	_init: function()
	{
		this.uq = Runtime.rtl.unique();
		this.ref = null;
		Runtime.BaseObject.prototype._init.call(this);
	},
	getClassName: function()
	{
		return "Runtime.Reference";
	},
});
Object.assign(Runtime.Reference, Runtime.BaseObject);
Object.assign(Runtime.Reference,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.Reference";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
	},
	getClassInfo: function()
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		return Dict.from({
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f&2)==2)
		{
			a.push("uq");
			a.push("ref");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		if (field_name == "uq") return Dict.from({
			"t": "string",
			"annotations": Collection.from([
			]),
		});
		if (field_name == "ref") return Dict.from({
			"t": "T",
			"annotations": Collection.from([
			]),
		});
		return null;
	},
	getMethodsList: function(f)
	{
		if (f==undefined) f=0;
		var a = [];
		if ((f&4)==4) a=[
		];
		return Runtime.Collection.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Reference);
window["Runtime.Reference"] = Runtime.Reference;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Reference;