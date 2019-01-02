import React from "react";

const float = {
  float: "right"
};

// Destructuring the type, className, children and onClick props, applying them to the button element
function Button({ type = "default", size, className, children, onClick }) {
  return (
    <button style={float} onClick={onClick} className={[`btn ${size}`, `btn-${type}`, className].join(" ")}>
      {children}
    </button>
  );
}

export default Button;
