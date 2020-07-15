/**
 *
 * @param {{streakMatcher:{lessthan,greaterThan, equalTo, includeUndefined}}, sampleSize} param0
 */
const createMongodbWordAgregate = ({ streakMatcher, sampleSize, excludeIds }) => {
  const aggregate = [];
  if (streakMatcher) {
    const {
      lessThan,
      greaterThan,
      equalTo,
      includeUndefined = false,
    } = streakMatcher;
    let matcher = { streak: {} };
    if (!isNaN(lessThan)) {
      matcher.streak['$lt'] = lessThan;
    }
    if (!isNaN(greaterThan)) {
      matcher.streak['$gt'] = greaterThan;
    }
    if (!isNaN(equalTo)) {
      matcher.streak['$eq'] = equalTo;
    }
    if (includeUndefined) {
      matcher = { $or: [{ streak: { $exists: false } }, matcher] };
    }

    aggregate.push({$match:matcher});
  }

  if (sampleSize) {
    aggregate.push({ $sample: {size: sampleSize} });
  }

  if(excludeIds){
    const matcher = {$match: {_id: {$nin: [...excludeIds] } }};
    aggregate.unshift(matcher);
  }

  return aggregate;
};

module.exports = createMongodbWordAgregate;
