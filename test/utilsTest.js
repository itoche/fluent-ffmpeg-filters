const assert = require('assert');
const ffmpeg = require('fluent-ffmpeg');
const registerFilter = require('../lib/utils').registerFilter;
const getFilters = require('../lib/utils').getFilters;
const addFilter = require('../lib/utils').addFilter;

describe('utils', function() {
  describe('#registerFilter()', function() {
    it('should add the filter and applyFilters() functions to ffmpeg', function() {

      registerFilter(ffmpeg, 'testFilter', function () { return 'Hello'});
      const instance = ffmpeg();
      assert(instance.testFilter);
      assert(typeof instance.testFilter === 'function');
      assert(instance.applyComplexFilter);
      assert(typeof instance.applyComplexFilter === 'function');
      assert(instance.applyAudioFilters);
      assert(typeof instance.applyAudioFilters === 'function');
      assert(instance.applyVideoFilters);
      assert(typeof instance.applyVideoFilters === 'function');
      assert.equal(instance.testFilter(), 'Hello');
    });
  });

  describe('#addFilter()', function() {
    it('should fail while adding an invalid filter object', function() {
      const instance = ffmpeg();

      registerFilter(ffmpeg, 'testFilter', function () { return 'Hello'});

      assert.throws(() => addFilter(instance, {name:'testFilter'}, Error));
    });
    it('should add the valid filter object', function() {
      const instance = ffmpeg();

      registerFilter(ffmpeg, 'testFilter', function () { return 'Hello'});

      addFilter(instance, {filter:'testFilter'});
    });
  });

  describe('#getFilters()', function() {
    it('should return the empty list of filters', function() {

      const instance = ffmpeg();

      let filters = getFilters(instance);
      assert(filters);
      assert(Array.isArray(filters));
      assert.equal(filters.length, 0);
    });
    it('should return the list of added filters', function() {

      const instance = ffmpeg();

      registerFilter(ffmpeg, 'testFilter', () => 'Hello');
      addFilter(instance, {filter:'testFilter'});
      filters = getFilters(instance);
      assert(Array.isArray(filters));
      assert.equal(filters.length, 1);

      addFilter(instance, {filter:'testFilter'});
      assert.equal(filters.length, 2);
    });
  });
});
