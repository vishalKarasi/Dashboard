import "./input.scss";
import React, { memo, useState } from "react";

function Input(props) {
  const { label, icon, errorMessage, pattern, ...input } = props;
  const [isFocus, setFocus] = useState(false);

  return (
    <div className="inputField">
      <input
        className={isFocus ? "input focused" : "input"}
        pattern={pattern}
        {...input}
        onBlur={() => setFocus(true)}
        autoComplete="off"
        required
        min={5}
        max={25}
      />
      {label && <label className="inputLabel">{label}</label>}
      {icon && icon}
      <p className={isFocus ? "inputError focused" : "inputError"}>
        {errorMessage}
      </p>
    </div>
  );
}

export default memo(Input);
