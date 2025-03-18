import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  constructor() {}

  async initDB() {
    try {
      this.db = await this.sqlite.createConnection('eventsDB', false, 'no-encryption', 1, false);
      await this.db.open();
      await this.createTables();
    } catch (error) {
      console.error('Error initializing DB:', error);
    }
  }

  async createTables() {
    const query = `
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        photo TEXT
      );
    `;
    await this.db.execute(query);
  }

  async addEvent(date: string, title: string, description: string, photo?: string) {
    const query = `INSERT INTO events (date, title, description, photo) VALUES (?, ?, ?, ?);`;
    await this.db.run(query, [date, title, description, photo || null]);
  }

  async getEvents() {
    const query = `SELECT * FROM events ORDER BY date DESC;`;
    const result = await this.db.query(query);
    return result.values || [];
  }

  async getEventById(id: number) {
    const query = `SELECT * FROM events WHERE id = ?;`;
    const result = await this.db.query(query, [id]);
    return result.values && result.values[0];
  }
}
