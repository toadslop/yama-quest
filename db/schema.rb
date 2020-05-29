# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_29_005951) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "list_mountains", force: :cascade do |t|
    t.integer "number"
    t.bigint "list_id", null: false
    t.bigint "mountain_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["list_id"], name: "index_list_mountains_on_list_id"
    t.index ["mountain_id"], name: "index_list_mountains_on_mountain_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "mountains", force: :cascade do |t|
    t.string "name"
    t.integer "altitude"
    t.string "terrain_diff"
    t.string "physical_diff"
    t.string "length"
    t.string "url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "region_id", null: false
    t.float "lat"
    t.float "lng"
    t.string "volcano_rank"
    t.string "eruption_alert"
    t.string "hike_season_start"
    t.string "hike_season_end"
    t.string "maple_season_end"
    t.string "maple_season_start"
    t.string "snow_season_start"
    t.string "snow_season_end"
    t.string "remaining_snow_start"
    t.string "remaining_snow_end"
    t.string "img_url"
    t.index ["region_id"], name: "index_mountains_on_region_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "list_mountains", "lists"
  add_foreign_key "list_mountains", "mountains"
  add_foreign_key "mountains", "regions"
end
