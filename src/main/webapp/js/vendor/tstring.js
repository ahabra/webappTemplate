// https://github.com/ahabra/tstring
// Author: Abdul Habra
// JavaScript String processing library

/** define namespace */
var tek271Libs = tek271Libs || {};
tek271Libs.text = tek271Libs.text || {};

/** make it easy */
function tstring(s, caseSensitive) {
	return new tek271Libs.text.String(s, caseSensitive);
}

/** constructor */
tek271Libs.text.String = function(s, caseSensitive) {
	this.__value= this.isUndefined(s) ? '' : s;
	if (this.isDefined(caseSensitive)) {
		this.__caseSensitive= caseSensitive;
	}
	return this;
};

tek271Libs.text.String.prototype.SPACES_ARRAY = [' ', '\u0009', '\u000a', '\u000b', '\u000c', '\u000d', '\u001c', '\u001d', '\u001e', '\u001f'];
tek271Libs.text.String.prototype.SPACES = tek271Libs.text.String.prototype.SPACES_ARRAY.join();
tek271Libs.text.String.prototype.VERSION= '0.0.1';

tek271Libs.text.String.prototype._extractValue = function(s) {
	return this.isOfThisType(s)? s.value() : s;
};

tek271Libs.text.String.prototype._isSpaceChar = function(char) {
	return this.SPACES.indexOf(char) >=0;
};

tek271Libs.text.String.prototype._empty = function() {
	return new tek271Libs.text.String('');
};

tek271Libs.text.String.prototype._null = function() {
	return new tek271Libs.text.String(null, true);
};

tek271Libs.text.String.prototype.value= function() {
	return this.__value;
};

tek271Libs.text.String.prototype.copy = function() {
	return new tek271Libs.text.String(this.__value, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.toString= function() {
	return this.__value;
};

tek271Libs.text.String.prototype.equals = function(other) {
	if (this.isUndefinedOrNull(other)) return false;
	if (other === this) return true;
	
	var ov= this._extractValue(other);
	if (typeof ov !== 'string') return false;
	
	var v= this.__value;
	if (this.isCaseSensitive()) {
		return v === ov;
	} else {
		return v.toLowerCase() === ov.toLowerCase();
	}
};

tek271Libs.text.String.prototype.equalsAny = function(others) {
	for (var i=0, n=arguments.length; i<n; i++) {
		if (this.equals(arguments[i])) return true;
	}
	return false;
};

tek271Libs.text.String.prototype.size = function() {
	var v= this.__value;
	
	if (v===null || v==='') return 0;
	return v.length;
};
	
tek271Libs.text.String.prototype.isOfThisType = function(val) {
	if (val===null) return false;
	if (typeof val !== 'object') return false;

	for (var k in this) {
		if (k!=='__value' && k!=='__caseSensitive') {
			if (this.isUndefined(val[k])) return false;
		}
	}
	return this.VERSION === val.VERSION;
};

tek271Libs.text.String.prototype.caseSensitive = function(isCaseSensitive) {
	isCaseSensitive= this.isUndefined(isCaseSensitive) ? true : isCaseSensitive;
	this.__caseSensitive= isCaseSensitive? true : false;
	return this;
};

tek271Libs.text.String.prototype.isCaseSensitive = function() {
	if (this.isUndefined(this.__caseSensitive)) return true;
	return this.__caseSensitive;
};

tek271Libs.text.String.prototype.indexOf = function(sub, startPos) {
	var s= this._extractValue(sub);
	var v= this.__value;
	if (v===null || s===null) return -1;
	if (v.length===0 && s.length===0) return 0;
	
	if (this.isCaseSensitive()){
		return v.indexOf(s, startPos);
	}
	return v.toLowerCase().indexOf(s.toLowerCase(), startPos);
};

tek271Libs.text.String.prototype.lastIndexOf = function(sub, startPos) {
	var s= this._extractValue(sub);
	var v= this.__value;
	if (v===null || s===null) return -1;
	if (v.length===0 && s.length===0) return 0;
	
	startPos = startPos || 0;
	if (this.isCaseSensitive()) {
		return v.lastIndexOf(s, startPos);
	}
	
	return v.toLowerCase().lastIndexOf(s.toLowerCase(), startPos);
};

tek271Libs.text.String.prototype.contains = function(sub) {
	if (this.__value===sub) return true;
	return this.indexOf(sub, 0) >=0;
};

tek271Libs.text.String.prototype.containsAny = function(valuesArray) {
	for (var i=0, n=arguments.length; i<n; i++) {
		if (this.contains(arguments[i])) return true;
	}
	return false;
};

tek271Libs.text.String.prototype.containsAnyChar = function(chars) {
	if (this.isUndefinedOrNull(chars)) return false;
	
	for (var i=0, n=chars.length; i<n; i++) {
		if (this.contains(chars.charAt(i))) return true;
	}
	
	return false;
};

tek271Libs.text.String.prototype.containsNone = function(searchArray) {
	for (var i=0, n=arguments.length; i<n; i++) {
		if (this.contains(arguments[i])) return false;
	}
	return true;
};

tek271Libs.text.String.prototype.containsNoneChars = function(chars) {
	if (this.isUndefinedOrNull(chars)) return true;
	
	for (var i=0, n=chars.length; i<n; i++) {
		if (this.contains(chars.charAt(i))) return false;
	}
	return true;
};

tek271Libs.text.String.prototype.containsOnly = function(chars) {
	if (this.isUndefinedOrNull(chars)) return false;
	
	var v= this.__value;
	if (!this.isCaseSensitive()) {
		chars= chars.toLowerCase();
		v= v.toLowerCase();
	}
	for (var i=0, n=v.length; i<n; i++) {
		if (chars.indexOf(v.charAt(i))<0) return false;
	}
	
	return true;
};

tek271Libs.text.String.prototype.containsWhitespace = function() {
	var v= this.__value;
	for (var i=0, n= v.length; i<n; i++) {
		if (this._isSpaceChar(v.charAt(i))) return true;
	}
	return false;
};

tek271Libs.text.String.prototype.isEmpty = function() {
	return this.size()===0;
};

tek271Libs.text.String.prototype.isNotEmpty = function() {
	return !this.isEmpty();
};

tek271Libs.text.String.prototype.isBlank = function() {
	if (this.isEmpty()) return true;
	
	var v= this.__value;
	for (var i=0, n= v.length; i<n; i++) {
		if (!this._isSpaceChar(v.charAt(i))) return false;
	}
	return true;
};

tek271Libs.text.String.prototype.isNotBlank = function() {
	return !this.isBlank();
};

tek271Libs.text.String.prototype.substring = function(start, end) {
	this.__value= this.__value.substring(start, end);
	return this;
};

tek271Libs.text.String.prototype.substringAfter = function(sep) {
	if (this.isEmpty()) return this;
	if (sep===null) return this._empty();
	sep = this._extractValue(sep);
	
	var pos= this.indexOf(sep, 0);
	if (pos<0) return this._empty();
	
	var v= this.__value.substring(pos+sep.length);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.substringAfterLast = function(sep) {
	var size= this.size();
	if (size===0) return this;
	if (sep===null || sep==='') return this._empty();
	sep = this._extractValue(sep);
	
	var pos= this.lastIndexOf(sep, size);
	if (pos<0 || pos===size-sep.length) return this._empty();
	
	var v= this.__value.substring(pos+sep.length);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.substringBefore = function(sep) {
	if (this.isEmpty()) return this;
	sep= this._extractValue(sep);
	if (sep===null) return this;
	if (sep==='') return this._empty();
	
	var pos= this.indexOf(sep, 0);
	if (pos<0) return this;
	
	var v= this.__value.substring(0, pos);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.substringBeforeLast = function(sep) {
	var valueLen= this.size();
	if (valueLen===0) return this;
	sep= this._extractValue(sep);
	if (sep===null || sep==='') return this;

	var pos= this.lastIndexOf(sep, valueLen);
	if (pos < 0) return this;
	
	var v= this.__value.substring(0, pos);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.substringBetween = function(open, close) {
	close= close || open;
	var v= this.__value;
	if (v===null || open===null || close===null) return this._null();
	open= this._extractValue(open);
	close= this._extractValue(close);
	
	var start = this.indexOf(open, 0);
	if (start<0) return this._null();
	
	var end= this.indexOf(close, start+open.length);
	if (end<0) return this._null();
	
	v= v.substring(start+open.length, end);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.substringsBetween = function(open, close) {
	var v= this.__value;
	if (v===null || open===null || close===null) return null;
	close= close || open;
	
	var valueLen= this.size();
	if (valueLen===0) return [];
	
	open= this._extractValue(open);
	close= this._extractValue(close);
	var openLen=open.length, closeLen=close.length, pos=0, list= [];
	var start, end, diff=valueLen-closeLen;
	while (pos < diff) {
		start= this.indexOf(open, pos);
		if (start < 0) break;
		
		start+= openLen;
		end= this.indexOf(close, start);
		if (end<0) break;
		
		list.push(v.substring(start, end));
		pos= end + closeLen;
	}
	return list;
};

tek271Libs.text.String.prototype.charAt = function(index) {
	return this.__value.charAt(index);
};

tek271Libs.text.String.prototype.toCharArray = function() {
	return this.__value.split('');
};

tek271Libs.text.String.prototype.forEachChar = function(callback) {
	var v= this.__value;
	for (var i=0, n=this.size(); i<n; i++) {
		if (callback.call({}, v.charAt(i), i) === false) return;
	}
};

tek271Libs.text.String.prototype.split = function(sep, limit) {
	return this.__value.split(sep, limit);
};

tek271Libs.text.String.prototype.join = function(sep, items) {
	var len= arguments.length;
	var ar= new Array(len);
	ar[0]= this.__value;
	for (var i=1; i<len; i++) {
		ar[i]= arguments[i];
	}
	var v= ar.join(sep);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.repeat = function(count, sep) {
	sep= sep || '';
	var buf= '';
	var v= this.__value;
	for (var i=0; i<count; i++) {
		buf += v;
		if (i<count-1) buf += sep;
	}
	return new tek271Libs.text.String(buf, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.defaultString = function(defaultValue) {
	if (this.__value!==null)	return this;

	if (this.isUndefined(defaultValue)) defaultValue= '';
	return new tek271Libs.text.String(defaultValue, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.startsWith = function(prefixes) {
	if (this.isUndefined(prefixes)) return true;
	
	for (var i=0, n=arguments.length; i<n; i++) {
		if (this.indexOf(arguments[i]) >=0) return true;
	}
	return false;
};

tek271Libs.text.String.prototype.endsWith = function(suffixes) {
	if (this.isUndefined(suffixes)) return true;
	
	var sz= this.size();
	for (var i=0, n=arguments.length; i<n; i++) {
		var suffix= arguments[i];
		var pos= this.indexOf(suffix);
		if (pos === sz-suffix.length) return true;
	}
	return false;
};

tek271Libs.text.String.prototype.caseLower = function() {
	return new tek271Libs.text.String(this.__value.toLowerCase(), this.isCaseSensitive());
};

tek271Libs.text.String.prototype.caseUpper = function() {
	return new tek271Libs.text.String(this.__value.toUpperCase(), this.isCaseSensitive());
};

tek271Libs.text.String.prototype.caseSwap = function() {
	var ar= this.toCharArray();
	for (var i=0, n=ar.length; i<n; i++) {
		var ch= ar[i];
		ch= ch<'a' ? ch.toLowerCase() : ch.toUpperCase();
		ar[i]= ch;
	}
	return new tek271Libs.text.String(ar.join(''), this.isCaseSensitive());
};

tek271Libs.text.String.prototype.caseCapitalize = function() {
	var ar= this.__value.split(' ');
	for (var i=0, n=ar.length; i<n; i++) {
		var word= ar[i];
		word= word.charAt(0).toUpperCase() + word.substring(1);
		ar[i]= word;
	}
	return new tek271Libs.text.String(ar.join(' '), this.isCaseSensitive());
};

tek271Libs.text.String.prototype.isWhitespace = function() {
	var n= this.size();
	if (n===0) return true;
	
	for (var i=0; i<n; i++) {
		var ch= this.charAt(i);
		if (!this._isSpaceChar(ch)) return false;
	}
	return true;
};

tek271Libs.text.String.prototype.isDigits = function() {
	var n= this.size();
	if (n===0) return false;
	
	for (var i=0; i<n; i++) {
		var ch= this.charAt(i);
		if (ch < '0' || ch > '9') return false;
	}
	return true;
};

tek271Libs.text.String.prototype.isNumber = function() {
	var v= this.__value;
	return !isNaN(parseFloat(v)) && isFinite(v);
};

tek271Libs.text.String.prototype.left = function(len) {
	if (this.isUndefined(len)) len= 1;
	if (len < 1) {
		return this._empty();
	}
	if (this.size() <= len) return this;
	
	var v= this.__value.substring(0, len);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.head = tek271Libs.text.String.prototype.left;

tek271Libs.text.String.prototype.right = function(len) {
	if (this.isUndefined(len)) len= 1;
	if (len < 1) {
		return this._empty();
	}
	var n= this.size();
	if (n <= len) return this;
	
	var v= this.__value.substring(n- len);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.tail = function(start) {
	if (this.isUndefined(start)) start= 1;
	var n= this.size();
	if (start>=n) {
		return this._empty();
	}
	
	var v= this.__value.substring(start);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.ltrim = function(charsToTrim) {
	if (charsToTrim===null) return this;
	charsToTrim= this.isUndefined(charsToTrim) ? this.SPACES : charsToTrim+'';

	var i, n= this.size();
	for (i=0; i<n; i++) {
		var ch= this.charAt(i);
		if (charsToTrim.indexOf(ch) < 0) break;
	}
	if (i===0) return this;
	var v= this.__value.substring(i);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.rtrim = function(charsToTrim) {
	if (charsToTrim===null) return this;
	charsToTrim= this.isUndefined(charsToTrim) ? this.SPACES : charsToTrim+'';

	var i, n= this.size()-1;
	for (i=n; i>=0; i--) {
		var ch= this.charAt(i);
		if (charsToTrim.indexOf(ch) < 0) break;
	}
	if (i===n) return this;
	var v= this.__value.substring(0,i+1);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.trim = function(charsToTrim) {
	return this.ltrim(charsToTrim).rtrim(charsToTrim);
};

tek271Libs.text.String.prototype.replaceRegEx = function(regex, newString) {
	var v = this.__value.replace(regex, newString);
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.replace = function(oldString, newString, count) {
	oldString= '' + oldString;
	if (this.isEmpty() || oldString.length===0 || newString===null || count < 1) return this;
	if (this.isUndefined(count)) count= this.size();
	newString= '' + newString;
	
	var end= this.indexOf(oldString);
	if (end < 0) return this;
	
	var replLen= oldString.length, buf= '', start=0;
	var value= this.__value;
	while (end >= 0) {
		buf += value.substring(start, end) + newString;
		start= end + replLen;
		if (--count <= 0) break;
		end= this.indexOf(oldString, start);
	}
	buf += value.substring(start);
	return new tek271Libs.text.String(buf, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.replacePairs = function(pairs, count) {
	var s= this;
	for (var k in pairs) {
		if (pairs.hasOwnProperty(k)) {
			s= s.replace(k, pairs[k], count);
		}
	}
	return s;
};

tek271Libs.text.String.prototype.remove = function(value, count) {
	var isArray= Object.prototype.toString.call(value) === '[object Array]';
	if (! isArray) {
		return this.replace(value, '', count);
	}
	
	var s= this;
	for (var i=0, n=value.length; i<n; i++) {
		s= s.replace(value[i], '', count);
	}
	return s;
};

tek271Libs.text.String.prototype.removeSpaces = function() {
	return this.remove(this.SPACES_ARRAY);
};

tek271Libs.text.String.prototype.normalizeSpace = function() {
	var v= this.trim();
	v= v.value().replace(/\s+/g, ' ');
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.reverse = function() {
	var v= this.__value.split('').reverse().join('');
	return new tek271Libs.text.String(v, this.isCaseSensitive());
};

tek271Libs.text.String.prototype.isUndefined = function(v) {
	return v===void 0;
};

tek271Libs.text.String.prototype.isDefined = function(v) {
	return ! this.isUndefined(v);
};

tek271Libs.text.String.prototype.isUndefinedOrNull = function(v) {
	return v===void 0 || v===null;
};


// Splitter, Joiner
	