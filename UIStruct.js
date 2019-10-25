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
Runtime.UIStruct = function(__ctx)
{
	Runtime.CoreStruct.apply(this, arguments);
};
Runtime.UIStruct.prototype = Object.create(Runtime.CoreStruct.prototype);
Runtime.UIStruct.prototype.constructor = Runtime.UIStruct;
Object.assign(Runtime.UIStruct.prototype,
{
	/**
	 * Returns true if component
	 * @return bool
	 */
	getTag: function(__ctx)
	{
		if (this.props == null)
		{
			return null;
		}
		return this.props.get(__ctx, "@tag", null);
	},
	/**
	 * Returns true if component
	 * @return bool
	 */
	isComponent: function(__ctx)
	{
		return this.kind == Runtime.UIStruct.TYPE_COMPONENT;
	},
	/**
	 * Returns true if element
	 * @return bool
	 */
	isElement: function(__ctx)
	{
		return this.kind == Runtime.UIStruct.TYPE_ELEMENT;
	},
	/**
	 * Returns true if string
	 * @return bool
	 */
	isString: function(__ctx)
	{
		return this.kind == Runtime.UIStruct.TYPE_STRING || this.kind == Runtime.UIStruct.TYPE_RAW;
	},
	/**
	 * Returns model
	 * @return CoreStruct
	 */
	getModel: function(__ctx)
	{
		return this.model;
		if (this.model != null)
		{
			return this.model;
		}
		if (this.kind == Runtime.UIStruct.TYPE_COMPONENT)
		{
			var modelName = Runtime.rtl.method(this.name, "modelName");
			var model_name = modelName(__ctx);
			if (model_name == "")
			{
				return null;
			}
			var model = Runtime.rtl.newInstance(__ctx, model_name, Runtime.Collection.from([this.props]));
			return model;
		}
		return null;
	},
	/**
	 * Returns key path
	 * @return string
	 */
	getKey: function(__ctx, index)
	{
		return (this.key !== "") ? this.key : index;
	},
	/**
	 * Returns key path
	 * @return string
	 */
	getKeyPath: function(__ctx, key_path, index)
	{
		return (key_path !== "") ? key_path + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(this.getKey(__ctx, index)) : this.getKey(__ctx, index);
	},
	/**
	 * Returns attrs
	 */
	getAttrs: function(__ctx)
	{
		if (this.props != null)
		{
			return this.props.filter(__ctx, (__ctx, key, value) => 
			{
				return Runtime.rs.strpos(__ctx, key, "@") != 0 || key == "@class" || key == "@style";
			});
		}
		return new Runtime.Dict(__ctx);
	},
	/**
	 * Returns props
	 */
	getProps: function(__ctx)
	{
		if (this.props != null)
		{
			return this.props.filter(__ctx, (__ctx, key, value) => 
			{
				return Runtime.rs.strpos(__ctx, key, "@") == 0 && Runtime.rs.strpos(__ctx, key, "@on") != 0 && key != "@class";
			});
		}
		return new Runtime.Dict(__ctx);
	},
	/**
	 * Returns events
	 */
	getEvents: function(__ctx)
	{
		if (this.props != null)
		{
			return this.props.filter(__ctx, (__ctx, key, value) => 
			{
				return Runtime.rs.strpos(__ctx, key, "@on") == 0;
			});
		}
		return new Runtime.Dict(__ctx);
	},
	_init: function(__ctx)
	{
		var defProp = use('Runtime.rtl').defProp;
		var a = Object.getOwnPropertyNames(this);
		this.__class_name = "";
		if (a.indexOf("class_name") == -1) defProp(this, "class_name");
		this.__key = "";
		if (a.indexOf("key") == -1) defProp(this, "key");
		this.__name = "";
		if (a.indexOf("name") == -1) defProp(this, "name");
		this.__bind = "";
		if (a.indexOf("bind") == -1) defProp(this, "bind");
		this.__kind = "element";
		if (a.indexOf("kind") == -1) defProp(this, "kind");
		this.__content = "";
		if (a.indexOf("content") == -1) defProp(this, "content");
		this.__reference = "";
		if (a.indexOf("reference") == -1) defProp(this, "reference");
		this.__value = null;
		if (a.indexOf("value") == -1) defProp(this, "value");
		this.__layout = null;
		if (a.indexOf("layout") == -1) defProp(this, "layout");
		this.__model = null;
		if (a.indexOf("model") == -1) defProp(this, "model");
		this.__props = null;
		if (a.indexOf("props") == -1) defProp(this, "props");
		this.__annotations = null;
		if (a.indexOf("annotations") == -1) defProp(this, "annotations");
		this.__children = null;
		if (a.indexOf("children") == -1) defProp(this, "children");
		Runtime.CoreStruct.prototype._init.call(this,__ctx);
	},
	assignObject: function(__ctx,o)
	{
		if (o instanceof Runtime.UIStruct)
		{
			this.__class_name = o.__class_name;
			this.__key = o.__key;
			this.__name = o.__name;
			this.__bind = o.__bind;
			this.__kind = o.__kind;
			this.__content = o.__content;
			this.__reference = o.__reference;
			this.__value = o.__value;
			this.__layout = o.__layout;
			this.__model = o.__model;
			this.__props = o.__props;
			this.__annotations = o.__annotations;
			this.__children = o.__children;
		}
		Runtime.CoreStruct.prototype.assignObject.call(this,__ctx,o);
	},
	assignValue: function(__ctx,k,v)
	{
		if (k == "class_name")this.__class_name = v;
		else if (k == "key")this.__key = v;
		else if (k == "name")this.__name = v;
		else if (k == "bind")this.__bind = v;
		else if (k == "kind")this.__kind = v;
		else if (k == "content")this.__content = v;
		else if (k == "reference")this.__reference = v;
		else if (k == "value")this.__value = v;
		else if (k == "layout")this.__layout = v;
		else if (k == "model")this.__model = v;
		else if (k == "props")this.__props = v;
		else if (k == "annotations")this.__annotations = v;
		else if (k == "children")this.__children = v;
		else Runtime.CoreStruct.prototype.assignValue.call(this,__ctx,k,v);
	},
	takeValue: function(__ctx,k,d)
	{
		if (d == undefined) d = null;
		if (k == "class_name")return this.__class_name;
		else if (k == "key")return this.__key;
		else if (k == "name")return this.__name;
		else if (k == "bind")return this.__bind;
		else if (k == "kind")return this.__kind;
		else if (k == "content")return this.__content;
		else if (k == "reference")return this.__reference;
		else if (k == "value")return this.__value;
		else if (k == "layout")return this.__layout;
		else if (k == "model")return this.__model;
		else if (k == "props")return this.__props;
		else if (k == "annotations")return this.__annotations;
		else if (k == "children")return this.__children;
		return Runtime.CoreStruct.prototype.takeValue.call(this,__ctx,k,d);
	},
	getClassName: function(__ctx)
	{
		return "Runtime.UIStruct";
	},
});
Object.assign(Runtime.UIStruct, Runtime.CoreStruct);
Object.assign(Runtime.UIStruct,
{
	TYPE_ELEMENT: "element",
	TYPE_COMPONENT: "component",
	TYPE_STRING: "string",
	TYPE_RAW: "raw",
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Runtime";
	},
	getCurrentClassName: function()
	{
		return "Runtime.UIStruct";
	},
	getParentClassName: function()
	{
		return "Runtime.CoreStruct";
	},
	getClassInfo: function(__ctx)
	{
		var Collection = Runtime.Collection;
		var Dict = Runtime.Dict;
		var IntrospectionInfo = Runtime.Annotations.IntrospectionInfo;
		return new IntrospectionInfo(__ctx, {
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Runtime.UIStruct",
			"name": "Runtime.UIStruct",
			"annotations": Collection.from([
			]),
		});
	},
	getFieldsList: function(__ctx, f)
	{
		var a = [];
		if (f==undefined) f=0;
		if ((f|3)==3)
		{
			a.push("class_name");
			a.push("key");
			a.push("name");
			a.push("bind");
			a.push("kind");
			a.push("content");
			a.push("reference");
			a.push("value");
			a.push("layout");
			a.push("model");
			a.push("props");
			a.push("annotations");
			a.push("children");
		}
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
Runtime.rtl.defClass(Runtime.UIStruct);