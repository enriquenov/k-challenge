var parse = (str) => {
    "use strict";

  var result;
  var at = 0;     // Index of current character
  var ch = " ";     // Current character

  // Call error for bad syntax.
  var error = (m) => {
      throw {
          name: "SyntaxError",
          message: m,
          at: at
      };
  };

  // Function to get the next character
  var next = (c) => {
    // Verify that c matches the character, or throw an error.
    if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'.");
    }

    ch = str.charAt(at);
    at += 1;
    return ch;
  };

  // Function to skip white spaces
  var white = () => {
    while (ch && ch <= " ") {
      next();
    }
  };

  // Function to parse a number value.
  var number = () => {

    var value;
    var string = "";

    while (ch >= "0" && ch <= "9") {
        string += ch;
        next();
    }

    value = +string;
    if (!isFinite(value)) {
        error("Bad number");
    } else {
        return value;
    }
  };

  // Parse an array value.
  var array = () => {
  // console.log("array function has been used.");

    var arr = [];

    if (ch === "[") {
      next("[");
      white();
      if (ch === "]") {
        next("]");
        return arr;   // empty array
      }
      while (ch) {
        arr.push(value());
        white();
        if (ch === "]") {
            next("]");
            return arr;
        }
        next(",");
        white();
      }
    }
    error("Bad array");
  };


  // Parse a JSON value. It could be an array of numbers or a nested array of numbers.
  var value = () => {
    white();
    switch (ch) {
      case "[":
        return array();
      default:
        if (ch >= "0" && ch <= "9") return number();
    }
  };

  // Return the json_parse function.

  result = value();
  white();
  if (ch) {
      error("Syntax error");
  }

  return result;

};

// Logging 8 tests...
console.log("Logging 8 tests...");
console.log(parse("[1, 2, 3]"));
console.log(parse("[5]"));
console.log(parse("[[6], [8, 2], [4, 3, 7, [5]]]"));
console.log(parse("[5, [[4, 6], [2, 3]], 8]"));
console.log(parse("[1, 2, 3]"));
console.log(parse("[[[[3]]]]"));
console.log(parse("[[[9, 1]], [[5, 3], 6]]"));
console.log(parse("[[3], [6], [9], [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]]"));
