import { useEffect, useState } from "react";
import { getCountries } from "../services/services";

function SelectCountry({ defaultCountry, name, id, className, register }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const data = await getCountries();
      setCountries(data);
    }
    fetchCountries();
  }, []);

  const flag = countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
      {...register("nationality", { required: true })}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`} selected={c.name === defaultCountry}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
