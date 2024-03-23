const Dropdown = ({ options, defaultValue, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      style={{
        borderRadius: "20px",
        padding: "6px",
        // backgroundColor: "#4c77af",
      }}
    >
      <option value={defaultValue} disabled selected>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const DropdownState = ({ options, defaultValue, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      style={{
        borderRadius: "20px",
        padding: "6px",
        // backgroundColor: "#4c77af",
      }}
    >
      <option value={defaultValue} disabled selected>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.state_code}>
          {option.state_code}
        </option>
      ))}
    </select>
  );
};

const DropdownCountry = ({ options, defaultValue, onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      style={{
        borderRadius: "20px",
        padding: "6px",
        // backgroundColor: "#4c77af",
      }}
    >
      <option
        style={{
          backgroundColor: "white",
        }}
        value={defaultValue}
        disabled
        selected
      >
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.country_code}>
          {option.country_code}
        </option>
      ))}
    </select>
  );
};

export { Dropdown, DropdownCountry, DropdownState };
