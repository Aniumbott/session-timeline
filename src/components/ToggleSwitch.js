import React from "react";

export default function ToggleSwitch(props) {
  const { checked, setChecked, disabled } = props;
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        onClick={() => setChecked(!checked)}
        onChange={() => {}}
      />
      <div className="relative w-[36px] h-[19px] border-[1px] border-theme-border rounded-full peer dark:bg-background peer-checked:after:translate-x-[17px] rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-[13px] after:w-[13px] after:transition-all peer-checked:border-theme-primary peer-checked:bg-theme-primary-dull peer-checked:after:bg-theme-primary"></div>
      {/* <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Toggle me
      </span> */}
    </label>
  );
}
