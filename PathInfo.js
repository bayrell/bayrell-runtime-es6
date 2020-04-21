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
Runtime.PathInfo = function(ctx)
{
};
Object.assign(Runtime.PathInfo.prototype,
{
	/**
	 * Returns string
	 */
	toString: function(ctx)
	{
		return this.filepath;
	},
	_init: function(ctx)
	{
		this.filepath = "";
		this.dirname = "";
		this.basename = "";
		this.extension = "";
		this.filename = "";
	},
	assignObject: function(ctx,o)
	{
		if (o instanceof Runtime.PathInfo)
		{
			this.filepath = o.filepath;
			this.dirname = o.dirname;
			this.basename = o.basename;
			this.extension = o.extension;
			this.filename = o.filename;
		}
	},
	assignValue: function(ctx,k,v)
	{
		if (k == "filepath")this.filepath = v;
		else if (k == "dirname")this.dirname = v;
		else if (k == "basename")this.basename = v;
		else if (k == "extension")this.extension = v;
		else if (k == "filename")this.filename = v;
	},
	takeValue: function(ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "filepath")return this.filepath;
		else if (k == "dirname")return this.dirname;
		else if (k == "basename")return this.basename;
		else if (k == "extension")return this.extension;
		else if (k == "filename")return this.filename;
	},
	getClassName: function(ctx)
	{
		return "Runtime.PathInfo";
	},
});
Object.assign(Runtime.PathInfo,
{
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.PathInfo";
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
			"class_name": "Runtime.PathInfo",
			"name": "Runtime.PathInfo",
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
			a.push("filepath");
			a.push("dirname");
			a.push("basename");
			a.push("extension");
			a.push("filename");
		}
		return Runtime.Collection.from(a);
	},
	getFieldInfoByName: function(ctx,field_name)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		if (field_name == "filepath") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "dirname") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "basename") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "extension") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
			"name": field_name,
			"annotations": Collection.from([
			]),
		});
		if (field_name == "filename") return new IntrospectionInfo(ctx, {
			"kind": IntrospectionInfo.ITEM_FIELD,
			"class_name": "Runtime.PathInfo",
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
	__implements__:
	[
		Runtime.Interfaces.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.PathInfo);