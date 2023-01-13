# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#User.create!(username: 'ThunderStorm', password: '1234', email: 'ThunderStorm@email.com')

i1 = Item.create(title: "LG 65inch TV", image:"https://www.lg.com/us/images/tvs/md08000561/gallery/desktop-01.jpg", price: "$250", description: "Put your entertainment on full display.")
i2 = Item.create(title: "Grand Theft Auto V - PlayStation 4", image:"https://media.gamestop.com/i/gamestop/10115462?fmt=auto&$pdp-gallery$", price: "$16.99", description: "When a young street hustler, a retired bank robber and a terrifying psychopath land themselves in trouble, they must pull off a series of dangerous heists to survive in a city in which they can trust nobody, least of all each other.")
i3 = Item.create(title: "Office Chair", image:"https://m.media-amazon.com/images/I/71mKwaKglhL.jpg", price: "$64.99", description: "Brand new chair, very comfortable.")