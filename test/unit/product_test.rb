require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  #fixtures :products

  test 'product attributes must not be empty' do
    product = Product.new
    assert product.invalid?
    assert product.errors[:title].any?
    assert product.errors[:description].any?
    assert product.errors[:price].any?
    assert product.errors[:images_url].any?
  end

  test 'product price must be positive' do
    product = Product.new(title: 'my book title', description: 'yyyyyyyy', images_url: 'http://static.adzerk.net/Advertisers/4c4f1be011a447efbce49c1811022e7a.png')
    product.price = -1
    assert product.invalid?
    assert_equal 'must be greater than or equal to 0.01', product.errors[:price].join('; ')

    product.price = 0
    assert_equal 'must be greater than or equal to 0.01', product.errors[:price].join('; ')

    product.price = 1
    assert product.valid?
  end

  def new_product(images_url)
    Product.new(title: 'my book', description: 'xxxx', price: 1, images_url: 'http://static.adzerk.net/Advertisers/4c4f1be011a447efbce49c1811022e7a.png')
  end

  test 'images url' do
    ok = %w{ fred.gif fred.jpg fred.png FRED.JPG FRED.jpg http://a.b.c/x/y/z/fred.fig }
    bad = %w{ fred.doc fred.gif/more fred.gif.more }

    ok.each do |name|
      assert new_product(name).valid?, '#{name} shouldn\'t be invalid'
    end

    bad.each do |name|
      assert new_product(name).invalid?, '#{name} shouldn\'t be valid'
    end
  end

end
