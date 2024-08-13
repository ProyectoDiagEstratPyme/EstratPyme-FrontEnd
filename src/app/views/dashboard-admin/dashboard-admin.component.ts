import { Component, OnInit, signal, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto'
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../models/user';
import { groupBy, map, toArray } from 'rxjs';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  imports: [NavbarComponent],
})
export class DashboardAdminComponent implements OnInit {
  users = signal<User[]>([]);
  year = signal<string>('2024-');

  private dashboardService = inject(DashboardService);

  groupedUsers: any;

  public chart: Chart | undefined;

  ngOnInit(): void {
    this.getGroupedUsersByMonth();
    console.log(this.groupedUsers)

    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Total empresas por mes',
          data: [60, 80, 20, 35, 93, 19, 47],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    this.chart = new Chart('chart', {
      type: 'line' as ChartType,
      data,
    });
  }

  getUsers() {
    this.dashboardService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
    });
  }

  getGroupedUsersByMonth() {
    this.dashboardService
      .getUsers()
      .pipe(
        map((users) =>
          users.filter((user) => user.registerDate?.startsWith(this.year()))
        ),
        groupBy(
          user => user.registerDate?.split('-')[1]
        ),
        map((group) => ({
          month: group.key,
          users: group.pipe(toArray()).toPromise(),
        }))
      )
      .subscribe(groupedUsers => {
          this.groupedUsers = groupedUsers;
      })
  }
}
