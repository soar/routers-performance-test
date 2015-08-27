$(document).ready(function(){
  function wrapimage(modelsc, testdir, imageext) {
    image = 'tests/' + modelsc + '/' + testdir + '/' + testdir + '_' + imageext + '.gif';
    return '<a class="thumbnail zoom" href="' + image + '"><img src="' + image + '" width="250px" /></a>';
  };

  $.getJSON('tests.json', function(data) {
    var tests = [];
    $.each(data, function(key, value) {
      tests.push('<li><a href="#' + value.sc + '">' + value.name + '</a></li>');
    });

    $('#tests-menu').append(tests.join(''));
  });

  var table = $('#tests').DataTable({
    dom: 'Bfrtip',
    fixedHeader: true,
    colReorder: true,
    rowReorder: true,
    order: [],
    scrollX: true,
    ajax: 'routers.json',
    columns: [
      { data: 'name' },
      { data: 'description' },
      { data: 'link' },

      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' },
      { data: 'sc' }
    ],
    columnDefs: [
      {
        targets: [3, 4, 5, 6, 7, 8, 9, 10, 11],
        render: function(data, type, row, meta) {
          var images = [
            'conn_established',
            'consec_lost',
            'lost_data',
            'max_consec_lost',
            'resp_time',
            'throughput',
            'trans_rate',
            'video_df',
            'video_mlr'
          ];
          return wrapimage(data, 'LAN-LC-64b-frames-10-threads', images[meta.col - 3]);
        }
      }
    ],
    buttons: [
      'colvis'
    ],
  });

  $('#tests').magnificPopup({
    delegate: 'a',
    type: 'image'
  });
});
