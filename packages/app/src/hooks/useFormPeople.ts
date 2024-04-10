import { useState } from "react";

type Selected = {
  formIndex: string;
  personName: string;
};

export function useFormPeople(initialSelected: Selected[] = []) {
  const [selected, setSelected] = useState<Selected[]>(initialSelected);

  const isPersonSelected = (formIndex: string, personName: string) => {
    const field = selected.find((value) => value.formIndex === formIndex);
    if (!field) return false;
    return field.personName === personName;
  };

  const selectPerson = (formIndex: string, personName: string) => {
    setSelected((prevSelected) => [...prevSelected, { formIndex, personName }]);
  };

  const fieldHasPersonSelected = (formIndex: string) => {
    return !!selected.find((value) => value.formIndex === formIndex);
  };

  const clearSelectedPerson = (formIndex: string) => {
    const updatedSelected = selected.filter(
      (value) => value.formIndex !== formIndex
    );
    setSelected(updatedSelected);
  };

  const clearSelectedPeople = () => setSelected([]);

  return {
    isPersonSelected,
    selectPerson,
    clearSelectedPerson,
    clearSelectedPeople,
    fieldHasPersonSelected,
  };
}
