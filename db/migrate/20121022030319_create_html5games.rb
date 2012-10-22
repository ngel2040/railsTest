class CreateHtml5games < ActiveRecord::Migration
  def change
    create_table :html5games do |t|

      t.timestamps
    end
  end
end
