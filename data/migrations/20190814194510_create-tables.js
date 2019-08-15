exports.up = function(knex) {
 return knex.schema
  .createTable('zoos', tbl => {
   tbl.increments();
   tbl
    .string('zoo_name', 128)
    .notNullable()
    .unique();
   tbl
    .string('address', 128)
    .notNullable()
    .unique();
  })
  .createTable('species', tbl => {
   tbl.increments();
   tbl
    .string('species_name', 128)
    .notNullable()
    .unique();
  })
  .createTable('animals', tbl => {
   tbl.increments();
   tbl.string('animal_name', 128);
   tbl
    .integer('species_id')
    .unsigned()
    .notNullable()
    .reference('id')
    // .reference('species.id')
    .inTable('species');
  })
  .createTable('zoo_animals', tbl => {
   tbl
    .integer('animal_id')
    .unsigned()
    .notNullable()
    .reference('animals.id');
   tbl
    .integer('zoo_id')
    .unsigned()
    .notNullable()
    .references('zoos_id');
   // combined primary key - enforce unique primary key
   tbl.primary(['zoo_id', 'animal_id']);
  });
};

exports.down = function(knex) {};
