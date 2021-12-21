import { useState, useCallback } from 'react';
import FilterBuilder from '../libraries/filter-builder/filter-builder';

const useFilters = (filterSettings) => {
  const [filterBuilder] = useState(new FilterBuilder());
  const [fullCollection, setFullCollection] = useState([]);
  const [collection, setCollection] = useState(filterBuilder.collection);

  const setInitialCollection = useCallback(
    (newCollection) => {
      filterBuilder.setCollection(newCollection);
      filterSettings.forEach(({ type, prop, title }) => {
        filterBuilder[type]({ prop, title });
      });
      setFullCollection(filterBuilder.collection);
      setCollection(filterBuilder.collection);
    },
    [filterSettings, filterBuilder],
  );

  const filterCollection = () => {
    const filteredEntities = [];
    const testFunctions = filterBuilder.createTestFunctions();
    fullCollection.forEach((entity) => {
      let entityAcceptable = true;
      for (let i = 0; i < testFunctions.length; i += 1) {
        const testEntity = testFunctions[i];
        if (!testEntity(entity)) {
          entityAcceptable = false;
          break;
        }
      }
      if (entityAcceptable) filteredEntities.push(entity);
    });
    setCollection(filteredEntities);
  };

  const changeFilter = (params) => {
    filterBuilder.updateFilter(params);
    filterCollection();
  };

  return [
    collection,
    filterBuilder.filters,
    setInitialCollection,
    changeFilter,
  ];
};

export default useFilters;
