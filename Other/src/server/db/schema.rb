# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120517145828) do

  create_table "data", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "records", :force => true do |t|
    t.string   "datetime"
    t.string   "corticosteriods"
    t.string   "anticholinergics"
    t.string   "eyedrops"
    t.string   "diabetes"
    t.string   "hypertension"
    t.string   "glaucoma"
    t.string   "cataracts"
    t.string   "maculardegeneration"
    t.string   "cognitiveimpairment"
    t.string   "glasses"
    t.string   "magnifier"
    t.string   "largeprint"
    t.string   "helpWithMed"
    t.string   "prescription"
    t.string   "nonprescription"
    t.string   "worn"
    t.string   "glossy"
    t.integer  "time"
    t.string   "userFont"
    t.integer  "userID"
    t.string   "other1"
    t.string   "other2"
    t.string   "other3"
    t.string   "other4"
    t.string   "other5"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "hashed_password"
    t.string   "email"
    t.string   "salt"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
