'use strict';

var Validator = require('../../../../../lib/provider/camunda/element-templates/Validator');


describe('element-templates - Validator', function() {

  function errors(validator) {
    return validator.getErrors().map(function(e) {
      return e.message;
    });
  }

  function valid(validator) {
    return validator.getValidTemplates();
  }


  it('should accept vip-ordering example template', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/vip-ordering');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.be.empty;

    expect(valid(templates)).to.have.length(1);
  });


  it('should accept misc example template', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/misc');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.be.empty;

    expect(valid(templates)).to.have.length(1);
  });


  it('should accept call-activity-variables template', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/call-activity-variables');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.be.empty;

    expect(valid(templates)).to.have.length(1);
  });


  it('should accept dropdown example template', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/dropdown');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.be.empty;

    expect(valid(templates)).to.have.length(1);
  });


  it('should reject missing id', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-id-missing');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.contain('missing template id');

    expect(valid(templates)).to.be.empty;
  });


  it('should reject duplicate id', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-id-duplicate');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.contain('template id <foo> already used');

    expect(valid(templates)).to.have.length(1);
  });


  it('should reject missing appliesTo', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-appliesTo-missing');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.contain('template(id: foo) missing appliesTo=[]');

    expect(valid(templates)).to.be.empty;
  });


  it('should reject missing properties', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-properties-missing');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.contain('template(id: foo) missing properties=[]');

    expect(valid(templates)).to.be.empty;
  });


  it('should reject missing dropdown choices', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-dropdown-choices-missing');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.eql([
      'must provide choices=[] with Dropdown type'
    ]);

    expect(valid(templates)).to.be.empty;
  });


  it('should reject invalid dropdown choices', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-dropdown-choices-invalid');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.eql([
      '{ name, value } must be specified for Dropdown choices'
    ]);

    expect(valid(templates)).to.be.empty;
  });


  it('should reject invalid property', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-property-invalid');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.eql([
      'invalid property type <InvalidType>; must be any of { String, Text, Boolean, Hidden, Dropdown }',
      'invalid property.binding type <alsoInvalid>; must be any of { ' +
        'property, camunda:property, camunda:inputParameter, ' +
        'camunda:outputParameter, camunda:in, camunda:out, camunda:in:businessKey }'
    ]);

    expect(valid(templates)).to.be.empty;
  });


  it('should reject invalid bindings', function() {

    // given
    var templates = new Validator();

    var templateDescriptors = require('./fixtures/error-bindings-invalid');

    // when
    templates.addAll(templateDescriptors);

    // then
    expect(errors(templates)).to.eql([
      'property.binding <property> requires name',
      'property.binding <camunda:property> requires name',
      'property.binding <camunda:inputParameter> requires name',
      'property.binding <camunda:outputParameter> requires source',
      'property.binding <camunda:in> requires variables or target',
      'property.binding <camunda:out> requires variables, sourceExpression or source'
    ]);

    expect(valid(templates)).to.be.empty;
  });

});