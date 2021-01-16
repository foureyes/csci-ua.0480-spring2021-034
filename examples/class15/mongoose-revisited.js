const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

/*
const CatSchema = new mongoose.Schema({
  name: String,
  lives: Number
});

// mongoose can extend models w/ plugins
// plugin that automatically creates a slug:
// specify what attributes to use for the slug
// the plugin will replace all spaces, lowercase (normalize it)
// and add that as a prop (without you having to define it)
// collection name will be cats
mongoose.model('Cat', CatSchema);

// get the contructor
const Cat = mongoose.model('Cat');

const c = new Cat({name: 'whatever', lives: 5});
*/
const ToppingSchema = new mongoose.Schema({
  // this is embedded
	name: String,
	extra: {type: Boolean, default:false}
});

const PizzaSchema = new mongoose.Schema({
	size: {type: String, enum: ['small', 'medium', 'large']},
	crust: String,
  // this is an example of embedding toppings in pizza
	toppings: [ToppingSchema]
});


// note that we left out slug from the schema...
// (the plugin will add it for you!)
// this should go before registering model!
// create an attribute called slug, it should
// consist of size and crust
PizzaSchema.plugin(URLSlugs('size crust'));

mongoose.model('Pizza', PizzaSchema);
mongoose.model('Topping', ToppingSchema);

const Pizza = mongoose.model('Pizza');
const pizza1 = new Pizza({
	size: 'small',
	crust: 'thin',
  toppings: [{name: 'pepperoni'}]
});

pizza1.save(function(err, pizza, count) {
	console.log('made me some pizza', pizza, count, err);
});



mongoose.connect('mongodb://localhost/pizzadb');

/*
{
  crust: 'thin';
  size: 'small'
  toppings: [{name: 'pineapple', extra:true}, {name: ice cream', extra: false}]
} 
{
  crust: 'thin';
  size: 'small'
  toppings: [1, 7, 2]
} 

{
  ObjectId: 7
  name: 'pina', 
  extra:true
}


 */



































