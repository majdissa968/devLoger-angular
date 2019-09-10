import { Injectable } from "@angular/core";
import { Log } from "../models/Log";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";

@Injectable({
  providedIn: "root"
})
export class LogService {
  logs: Log[];

  private logService = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });

  selectedLog = this.logService.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Generated Components",
    //     date: new Date("12/26/2019 12:54:23")
    //   },
    //   {
    //     id: "2",
    //     text: "Added Bootstrap",
    //     date: new Date("09/26/2019 12:54:23")
    //   },
    //   {
    //     id: "3",
    //     text: "Added Logs Components",
    //     date: new Date("12/26/2019 12:54:23")
    //   }
    // ];
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem("logs") === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem("logs"));
    }
    return of(
      this.logs.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  setFormLog(log: Log) {
    this.logService.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    //Add to Local Storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    //update to Local Storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    //Delete FROM Local Storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
