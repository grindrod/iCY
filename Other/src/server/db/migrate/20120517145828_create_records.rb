class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.string :datetime
      t.string :corticosteriods
      t.string :anticholinergics
      t.string :eyedrops
      t.string :diabetes
      t.string :hypertension
      t.string :glaucoma
      t.string :cataracts
      t.string :maculardegeneration
      t.string :cognitiveimpairment
      t.string :glasses
      t.string :magnifier
      t.string :largeprint
      t.string :helpWithMed
      t.string :prescription
      t.string :nonprescription
      t.string :worn
      t.string :glossy
      t.integer :time
      t.string :userFont
      t.integer :userID
      t.string :other1
      t.string :other2
      t.string :other3
      t.string :other4
      t.string :other5
      t.timestamps
    end
  end
end
