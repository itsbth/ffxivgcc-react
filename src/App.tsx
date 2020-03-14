import React, { useState, useCallback, useMemo } from 'react';
import data from './data.json';

const App = () => {
  const [type, setType] = useState(data.types[0].key);
  const updateType = useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      setType(evt.target.value);
    },
    [setType],
  );

  const [gear, setGear] = useState<string[]>([]);
  const [upgrade, setUpgrade] = useState<string[]>([]);

  const selectAll = useCallback(() => {
    setGear(Object.keys(data.slotNames));
    setUpgrade(Object.keys(data.slotNames));
  }, [setGear, setUpgrade]);

  const selectNone = useCallback(() => {
    setGear([]);
    setUpgrade([]);
  }, [setGear, setUpgrade]);

  const changeGear = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = evt.target;
      if (evt.target.checked) {
        setGear(gear => [...gear, name]);
      } else {
        setGear(gear => gear.filter(na => na !== name));
      }
    },
    [setGear],
  );
  const changeUpgrade = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = evt.target;
      if (evt.target.checked) {
        setUpgrade(gear => [...gear, name]);
      } else {
        setUpgrade(gear => gear.filter(na => na !== name));
      }
    },
    [setUpgrade],
  );

  const cost = useMemo(() => {
    const costs = data.types.find(gs => gs.key === type)?.costs;
    if (!costs) return 0;
    return (
      gear.reduce(
        (acc, el) => acc + costs[el as keyof typeof data.slotNames],
        0,
      ) +
      upgrade.length * 100
    );
  }, [gear, upgrade, type]);

  return (
    <>
      <div className="actions">
        <button type="button" onClick={selectAll}>
          Check all
        </button>{' '}
        <button type="button" onClick={selectNone}>
          Uncheck all
        </button>
      </div>
      <label htmlFor="type">
        Select gear type{' '}
        <select name="type" id="type" value={type} onChange={updateType}>
          <option value="n/a" disabled>
            Select a gear type
          </option>
          {data.types.map(ty => (
            <option key={ty.key} value={ty.key}>
              {ty.name}
            </option>
          ))}
        </select>
      </label>
      <div>
        {Object.entries(data.slotNames).map(([key, value]) => (
          <div key={key}>
            <label>
              <input
                type="checkbox"
                name={key}
                checked={gear.includes(key)}
                onChange={changeGear}
              />
              {value}
            </label>
            <label>
              <input
                type="checkbox"
                name={key}
                checked={upgrade.includes(key)}
                onChange={changeUpgrade}
              />
              Upgrade
            </label>
          </div>
        ))}
      </div>
      <div>
        <h2>Cost: {cost} poetics</h2>
        <p>Equivalent to:</p>
        {Math.ceil(cost / data.rewards.arf.normal)} runs of Aetherochemical
        Research Facility (
        {Math.ceil(cost / (data.rewards.arf.normal + data.rewards.arf.bonus))}{' '}
        with first-time bonus).
      </div>
    </>
  );
};
export default App;
