# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Product.delete_all

# new product seeds
Product.create(title: 'Programming Ruby 1.9',
  description: %{<p>====================================Ruby========================================</p>},
  images_url: 'http://static.adzerk.net/Advertisers/4c4f1be011a447efbce49c1811022e7a.png',
  price: 49.95)
# product seeds end