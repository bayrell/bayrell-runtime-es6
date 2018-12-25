"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
Runtime.UIStruct = class extends Runtime.CoreStruct{
	/**
	 * Returns true if component
	 * @return bool
	 */
	isComponent(){
		return this.kind == Runtime.UIStruct.TYPE_COMPONENT;
	}
	/**
	 * Returns true if string
	 * @return bool
	 */
	isString(){
		return this.kind == Runtime.UIStruct.TYPE_STRING || this.kind == Runtime.UIStruct.TYPE_RAW;
	}
	/**
	 * Returns true if component and name == class_name
	 * @param string class_name
	 * @return bool
	 */
	instanceOf(class_name){
		if (this.is_component && this.name == class_name){
			return true;
		}
		return false;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "Runtime.UIStruct";}
	static getParentClassName(){return "Runtime.CoreStruct";}
	_init(){
		super._init();
		this.id = "";
		this.key = "";
		this.name = "";
		this.kind = "element";
		this.content = "";
		this.props = null;
		this.children = null;
	}
	assignObject(obj){
		if (obj instanceof Runtime.UIStruct){
			this.id = Runtime.rtl._clone(obj.id);
			this.key = Runtime.rtl._clone(obj.key);
			this.name = Runtime.rtl._clone(obj.name);
			this.kind = Runtime.rtl._clone(obj.kind);
			this.content = Runtime.rtl._clone(obj.content);
			this.props = Runtime.rtl._clone(obj.props);
			this.children = Runtime.rtl._clone(obj.children);
		}
		super.assignObject(obj);
	}
	assignValue(variable_name, value){
		if (variable_name == "id") this.id = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "key") this.key = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "name") this.name = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "kind") this.kind = Runtime.rtl.correct(value, "string", "element", "");
		else if (variable_name == "content") this.content = Runtime.rtl.correct(value, "string", "", "");
		else if (variable_name == "props") this.props = Runtime.rtl.correct(value, "Runtime.Map", null, "mixed");
		else if (variable_name == "children") this.children = Runtime.rtl.correct(value, "Runtime.Vector", null, "mixed");
		else super.assignValue(variable_name, value);
	}
	takeValue(variable_name, default_value){
		if (default_value == undefined) default_value = null;
		if (variable_name == "id") return this.id;
		else if (variable_name == "key") return this.key;
		else if (variable_name == "name") return this.name;
		else if (variable_name == "kind") return this.kind;
		else if (variable_name == "content") return this.content;
		else if (variable_name == "props") return this.props;
		else if (variable_name == "children") return this.children;
		return super.takeValue(variable_name, default_value);
	}
	static getFieldsList(names){
		names.push("id");
		names.push("key");
		names.push("name");
		names.push("kind");
		names.push("content");
		names.push("props");
		names.push("children");
	}
	static getFieldInfoByName(field_name){
		return null;
	}
}
Runtime.UIStruct.TYPE_ELEMENT = "element";
Runtime.UIStruct.TYPE_COMPONENT = "component";
Runtime.UIStruct.TYPE_STRING = "string";
Runtime.UIStruct.TYPE_RAW = "raw";