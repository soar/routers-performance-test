$(document).ready(function(){
  function wrapimage(modelsc, testdir, imageext) {
    image = 'tests/' + modelsc + '/' + testdir + '/' + testdir + '_' + imageext + '.gif';
    return '<a class="thumbnail zoom" href="' + image + '"><img src="' + image + '" width="250px" /></a>';
  };

  var testdata = {};

  $.getJSON('tests.json', function(data) {
    var tests = [];
    $.each(data, function(key, value) {
      testdata[value.sc] = {};
      testdata[value.sc].dir = value.dir;
      testdata[value.sc].name = value.name;
      tests.push('<li><a href="#' + value.sc + '">' + value.name + '</a></li>');
    });

    $('#tests-menu').append(tests.join(''));
    $('#tests-menu a').click(function () {
      location.reload();
    });
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
      { data: 'sc' }
    ],
    columnDefs: [
      {
        targets: [3, 4, 5, 6, 7, 8, 9, 10],
        render: function(data, type, row, meta) {
          var images = [
            'consec_lost',
            'lost_data',
            'max_consec_lost',
            'resp_time',
            'throughput',
            'trans_rate',
            'video_df',
            'video_mlr'
          ];
          testname = location.hash.replace('#', '');
          if (testname in testdata) {
            testdir = testdata[testname].dir;
            return wrapimage(data, testdir, images[meta.col - 3]);
          } else {
            return '';
          }
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
