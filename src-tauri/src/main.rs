// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};
fn main() {

  let migrations = vec![
    Migration {
        version: 1,
        description: "create_initial_user_table",
        sql: "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, username TEXT NOT NULL, email TEXT NOT NULL);",
        kind: MigrationKind::Up
    },
    Migration {
      version: 2,
      description: "create_initial_product_table",
      sql: "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL);",
      kind: MigrationKind::Up
    },
    Migration {
      version: 3,
      description: "create_initial_permissions_table",
      sql: "CREATE TABLE IF NOT EXISTS permissions (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description REAL NOT NULL);",
      kind: MigrationKind::Up
    }
  ];

  tauri::Builder::default()
    .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:/Users/andrelagsac/Downloads/parking_pos_poc.sqlite", migrations).build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
