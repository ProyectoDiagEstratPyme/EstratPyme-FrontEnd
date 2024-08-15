import { Component, OnInit, signal, inject } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto'
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DashboardService } from '../../services/dashboard.service';
import { User } from '../../models/user';
import { AddStudentButtonComponent } from "../../components/add-student-button/add-student-button.component";
import { AddTeacherButtonComponent } from "../../components/add-teacher-button/add-teacher-button.component";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  imports: [NavbarComponent, AddStudentButtonComponent, AddTeacherButtonComponent],
})
export class DashboardAdminComponent implements OnInit {
  lineChart: Chart | undefined;
  pieChart: Chart | undefined;
  radarChart: Chart | undefined;
  barChart: Chart | undefined;
  users = signal<User[]>([]);
  year = signal<string>('2024-');
  groupedUsersByMonth: any;
  groupedUsersBySize: any;
  groupedUsersBySector: any;
  groupedUsersByDownload: any;

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.getGroupedUsersByMonth();
    this.getGroupedUsersBySize();
    this.getGroupedUsersBySector();
    this.getGroupedUsersByDownload();
  }

  handleYearChange(event: Event) {
    this.year.set((event.target as HTMLInputElement).value);
    this.getGroupedUsersByMonth();
  }

  getGroupedUsersByMonth() {
    this.dashboardService.getUsers().subscribe((users) => {
      const usersByYear = users.filter((user) =>
        user.registerDate?.startsWith(this.year())
      );
      const userCountByMonth = Array(12).fill(0);
      usersByYear.forEach((user) => {
        const userRegisterDate = user.registerDate != null ? user.registerDate : "2024-01"
        const month = parseInt(userRegisterDate.split('-')[1], 10) - 1;
        userCountByMonth[month]++;
      });

      this.groupedUsersByMonth = userCountByMonth;
      this.updateLineChart();
    });
  }

  getGroupedUsersBySize() {
    this.dashboardService.getUsers().subscribe((users) => {
      const small = users.filter((user) => user.sizeCompany == '1').length;
      const medium = users.filter((user) => user.sizeCompany == '2').length;
      const large = users.filter((user) => user.sizeCompany == '3').length;

      console.log(small, medium, large);

      this.groupedUsersBySize = [small, medium, large];
    });
    this.initializePieChart();
  }

  getGroupedUsersBySector() {
    this.dashboardService.getUsers().subscribe((users) => {
      const primary = users.filter((user) => user.sector == '1').length;
      const secondary = users.filter((user) => user.sector == '2').length;
      const tertiary = users.filter((user) => user.sector == '3').length;
      const quaternary = users.filter((user) => user.sector == '4').length;

      this.groupedUsersBySector = [primary, secondary, tertiary, quaternary];
    });
    this.initializeRadarChart();
  }

  getGroupedUsersByDownload() {
    this.dashboardService.getUsers().subscribe((users) => {
      const downloaded = users.filter((user) => user.isBookDonwloaded == true).length;
      const notDownloaded = users.filter((user) => user.isBookDonwloaded == false).length;

      this.groupedUsersByDownload = [downloaded, notDownloaded];
    });
    this.initiliazeBarChart();
  }

  updateLineChart() {
    this.lineChart?.destroy();

    this.lineChart = new Chart('lineChart', {
      type: 'line' as ChartType,
      data: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        datasets: [
          {
            label: 'Total empresas registradas por mes',
            data: this.groupedUsersByMonth,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }

  initializePieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
        labels: ['Pequeña', 'Mediana', 'Grande'],
        datasets: [
          {
            label: 'Empresas registradas por tamaño',
            data: this.groupedUsersBySize,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 3,
          },
        ],
      },
    });
  }

  initializeRadarChart() {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
    this.radarChart = new Chart(ctx, {
      type: 'radar' as ChartType,
      data: {
        labels: ['Sector Primario', 'Sector Secundario', 'Sector Terciario', 'Sector Cuaternario'],
        datasets: [
          {
            label: 'Empresas registradas por tamaño',
            data: this.groupedUsersBySector,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }

  initiliazeBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar' as ChartType,
      data: {
        labels: ['Lo descargaron', 'No lo descargaron'],
        datasets: [
          {
            label: 'Empresas registradas que descargaron el libro',
            data: this.groupedUsersByDownload,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
          },
        ],
      },
    });
  }
}
