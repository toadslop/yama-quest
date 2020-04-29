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

ActiveRecord::Schema.define(version: 2020_04_29_020136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "list_region_mountains", force: :cascade do |t|
    t.bigint "list_regions_id"
    t.bigint "mountains_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["list_regions_id"], name: "index_list_region_mountains_on_list_regions_id"
    t.index ["mountains_id"], name: "index_list_region_mountains_on_mountains_id"
  end

  create_table "list_regions", force: :cascade do |t|
    t.bigint "lists_id"
    t.bigint "regions_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lists_id"], name: "index_list_regions_on_lists_id"
    t.index ["regions_id"], name: "index_list_regions_on_regions_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "mountains", force: :cascade do |t|
    t.integer "number"
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
    t.index ["region_id"], name: "index_mountains_on_region_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "mountains", "regions"
end
