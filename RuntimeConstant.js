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
Runtime.RuntimeConstant = class{
	getClassName(){return "Runtime.RuntimeConstant";}
	static getParentClassName(){return "";}
	/* Log level */
	/**
	 * Fatal error. Application stoped
	 */
	/**
	 * Critical error. Application damaged, but works
	 */
	/**
	 * Any Application error or exception
	 */
	/**
	 * Log warning. Developer should attention to this
	 */
	/**
	 * Information about any event
	 */
	/**
	 * Debug level 1
	 */
	/**
	 * Debug level 2
	 */
	/* Status codes */
	/* Errors */
}
Runtime.RuntimeConstant.LOG_FATAL = 0;
Runtime.RuntimeConstant.LOG_CRITICAL = 2;
Runtime.RuntimeConstant.LOG_ERROR = 4;
Runtime.RuntimeConstant.LOG_WARNING = 6;
Runtime.RuntimeConstant.LOG_INFO = 8;
Runtime.RuntimeConstant.LOG_DEBUG = 10;
Runtime.RuntimeConstant.LOG_DEBUG2 = 12;
Runtime.RuntimeConstant.STATUS_DONE = 0;
Runtime.RuntimeConstant.STATUS_PLAN = 1;
Runtime.RuntimeConstant.STATUS_PROCESS = 2;
Runtime.RuntimeConstant.STATUS_FAIL = -1;
Runtime.RuntimeConstant.ERROR_NULL = 0;
Runtime.RuntimeConstant.ERROR_OK = 1;
Runtime.RuntimeConstant.ERROR_PROCCESS = 100;
Runtime.RuntimeConstant.ERROR_FALSE = -100;
Runtime.RuntimeConstant.ERROR_UNKNOWN = -1;
Runtime.RuntimeConstant.ERROR_INDEX_OUT_OF_RANGE = -2;
Runtime.RuntimeConstant.ERROR_KEY_NOT_FOUND = -3;
Runtime.RuntimeConstant.ERROR_STOP_ITERATION = -4;
Runtime.RuntimeConstant.ERROR_OBJECT_DOES_NOT_EXISTS = -5;
Runtime.RuntimeConstant.ERROR_OBJECT_ALLREADY_EXISTS = -6;
Runtime.RuntimeConstant.ERROR_ASSERT = -7;
Runtime.RuntimeConstant.ERROR_REQUEST = -8;
Runtime.RuntimeConstant.ERROR_RESPONSE = -9;
Runtime.RuntimeConstant.ERROR_CSRF_TOKEN = -10;
Runtime.RuntimeConstant.ERROR_RUNTIME = -11;
Runtime.RuntimeConstant.ERROR_VALIDATION = -12;