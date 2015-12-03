var app = {
    rango : 0,
    amplitud : 0,
    nroClases : 0,
    unidad : 1,
    totalvalores : 0,
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    calcularTabla : function(){
      var cadena = $("#textarea1").val();    
      var valores = cadena.split(",");

      var maximo = Math.max.apply(Math, valores);
      var minimo = Math.min.apply(Math, valores);
      
      app.nroClases = $("#nroClases").val();

      app.rango = maximo - minimo; 
      $("#rango").html("<strong>R</strong> = "+maximo+" - "+minimo+" = "+app.rango);

      app.amplitud = Math.ceil(app.rango / app.nroClases); 
      $("#amplitud").html("<strong>W</strong> = "+app.rango+" / "+app.nroClases+" = "+app.amplitud);

     var colum1 = 0;
     var colum2 = 0;
     var frecuencia_acum = 0;
     var frecuencia = 0;
     var frecuencia_acum_down = app.totalvalores;
     var valor_anterior = 0;
     var limite_inferior = 0;
     var limite_superior = 0;
     var marca = 0;
     var frecuencia_relativa = 0;
     var frecuencia_relativa_acum = 0;
     

     //Limite Inferior
     limite_inferior = ((minimo)-(app.unidad/(2)));
     $("#limInf").html("<strong>Lim inf</strong> = "+limite_inferior);
     //Limite Inferior

     //Limite Superior
     limite_superior = ((minimo + app.amplitud - app.unidad)+(app.unidad/(2)));
     $("#limSup").html("<strong>Lim Sup</strong> = "+limite_superior);
     //Limite Superior

     //Marca
     marca = ((minimo+(minimo+app.amplitud - app.unidad))/(2));
     $("#marca").html("<strong>Marca</strong> = "+marca);
     //Marca

     //Calculo de tabla
     for (var a = 0; a <app.nroClases; a++) {
         if(a==0){
             colum1 = minimo;
             colum2 = colum1 + app.amplitud - app.unidad;
             
             for (var i = 0; i < valores.length; i++) {

               if(valores[i]>=colum1 && valores[i]<=colum2) {
                    frecuencia_acum++;
                    frecuencia++;
               }
             }

             valor_anterior = frecuencia;
             frecuencia_acum_down = frecuencia_acum_down - valor_anterior;

             //FRECUENCIA RELATIVA
             frecuencia_relativa = frecuencia / app.totalvalores;
             frecuencia_relativa_acum = frecuencia_relativa_acum +frecuencia_relativa;

            $("#table-column-toggle tbody").append(
             "<tr>"+
                 "<th class='ui-table-priority-2'>"+colum1 +'-'+colum2+"</th>"+
                  "<td>"+frecuencia+"</td>"+
                  "<td class='ui-table-priority-3'>"+limite_inferior+" - "+limite_superior+"</td>"+
                  "<td class='ui-table-priority-1'>"+marca+"</td>"+
                  "<td class='ui-table-priority-5'>"+frecuencia_relativa+" - "+(frecuencia_relativa*100)+"%</td>"+
                  "<td class='ui-table-priority-6'>"+frecuencia_acum+" - "+ app.totalvalores+"</td>"+
                  "<td class='ui-table-priority-7'>"+frecuencia_relativa_acum+" - "+(frecuencia_relativa_acum*100)+"%</td>"+
                "</tr>");
             frecuencia=0;
         }
         else{
           //CLASES 
           colum1 = colum1 + app.amplitud; 
           colum2 = colum1 + app.amplitud - app.unidad;

           marca = marca + app.amplitud;
           limite_inferior = limite_inferior + app.amplitud;
           limite_superior = limite_superior + app.amplitud;

           //FRECUENCIA
           for (var i = 0; i < valores.length; i++) {

               if(valores[i]>=colum1 && valores[i]<=colum2) {
                    frecuencia_acum++;
                    frecuencia++;
               }
           }

           //FRACUENCIA RELATIVA
           frecuencia_relativa = frecuencia / app.totalvalores;
           frecuencia_relativa_acum = frecuencia_relativa_acum +frecuencia_relativa;

            $("#table-column-toggle tbody").append(
             "<tr>"+
                 "<th class='ui-table-priority-2'>"+colum1 +'-'+colum2+"</th>"+
                  "<td>"+frecuencia+"</td>"+
                  "<td class='ui-table-priority-3'>"+limite_inferior+" - "+limite_superior+"</td>"+
                  "<td class='ui-table-priority-1'>"+marca+"</td>"+
                  "<td class='ui-table-priority-5'>"+frecuencia_relativa+" - "+(frecuencia_relativa*100)+"%</td>"+
                  "<td class='ui-table-priority-6'>"+frecuencia_acum+" - "+frecuencia_acum_down+"</td>"+
                  "<td class='ui-table-priority-7'>"+frecuencia_relativa_acum+" - "+(frecuencia_relativa_acum*100)+"%</td>"+
                "</tr>");
            
            valor_anterior = frecuencia;
            frecuencia_acum_down = frecuencia_acum_down - valor_anterior;

            frecuencia=0;
         }
     }
     //Calculo de tabla       
    },

    onDeviceReady: function() {
       //alert("OK");
       app.nroClases = $("#nroClases").val(); 
       app.NumeroDatos();
       $("#btnCalculaTabla").on('click',function(evt){app.calcularTabla();});   


    //  $('#container').highcharts({
    //     title: {
    //         text: 'Monthly Average Temperature',
    //         x: -20 //center
    //     },
    //     subtitle: {
    //         text: 'Source: WorldClimate.com',
    //         x: -20
    //     },
    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Temperature (°C)'
    //         },
    //         plotLines: [{
    //             value: 0,
    //             width: 1,
    //             color: '#808080'
    //         }]
    //     },
    //     tooltip: {
    //         valueSuffix: '°C'
    //     },
    //     legend: {
    //         layout: 'vertical',
    //         align: 'right',
    //         verticalAlign: 'middle',
    //         borderWidth: 0
    //     },
    //     series: [{
    //         name: 'Tokyo',
    //         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    //     }, {
    //         name: 'New York',
    //         data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    //     }, {
    //         name: 'Berlin',
    //         data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    //     }, {
    //         name: 'London',
    //         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    //     }]
    // });


    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Browser market shares. January, 2015 to May, 2015'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
        column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
        }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Microsoft Internet Explorer',
                y: 56.33,
                drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Chrome',
                y: 24.03,
                drilldown: 'Chrome'
            }, {
                name: 'Firefox',
                y: 10.38,
                drilldown: 'Firefox'
            }, {
                name: 'Safari',
                y: 4.77,
                drilldown: 'Safari'
            }, {
                name: 'Opera',
                y: 0.91,
                drilldown: 'Opera'
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2,
                drilldown: null
            }]
        }],
    });

    $('#container3').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Microsoft Internet Explorer',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    y: 10.38
                }, {
                    name: 'Safari',
                    y: 4.77
                }, {
                    name: 'Opera',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    y: 0.2
                }]
            }]
        });
    },

    NumeroDatos : function(){
       var cadena = $("#textarea1").val();  
       var valores = cadena.split(",");
       app.totalvalores = valores.length;
       $("#total_datos").html("<strong>N</strong> = "+app.totalvalores);
    }
};
