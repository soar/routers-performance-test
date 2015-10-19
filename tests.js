$(document).ready(function(){
  function wrapimage(modelsc, testdir, imageext) {
    image = 'tests/' + modelsc + '/' + testdir + '/' + testdir + '_' + imageext + '.gif';
    return '<a class="zoom" href="' + image + '"><img src="' + image + '" width="200px" height="100px" /></a>';
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
      window.location.hash = $(this).attr('href');
      window.location.reload(true);
    });

    testname = location.hash.replace('#', '');
    if (testname in testdata) {
      $('#testname').text(testdata[testname].name);
    };
  });

  var table = $('#tests').DataTable({
    dom: 'Bfrtip',
    fixedHeader: true,
    //colReorder: true,
    //rowReorder: true,
    order: [],
    //scrollX: true,
    paging: false,
    ajax: 'routers.json',
    columns: [
      { data: 'name' },
      { data: 'chipset' },

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
        targets: [2, 3, 4, 5, 6, 7, 8, 9],
        render: function(data, type, row, meta) {
          var images = [
            'throughput',
            'lost_data',
            'resp_time',
            'trans_rate',
            'video_df',
            'video_mlr',
            'consec_lost',
            'max_consec_lost'
          ];
          testname = location.hash.replace('#', '');
          if (testname in testdata) {
            testdir = testdata[testname].dir;
            return wrapimage(data, testdir, images[meta.col - 2]);
          } else {
            return '';
          }
        }
      }
    ],
    buttons: [
      'colvis'
    ],
    initComplete: function(setting, json) {
      $('#tests img').error(function() {
       $(this).attr('src', 'notavailable.png');
      });
    }
  });

  $('#tests').magnificPopup({
    delegate: 'a',
    type: 'image'
  });

  $('#tests tbody').on('click', 'tr', function() {
    $(this).toggleClass('selected');
  });

  $('#btn-tbl-show').click(function () {
    table.rows(':not(.selected)').remove().draw(false);
  });

  $('#btn-tbl-hide').click(function () {
    table.rows('.selected').remove().draw(false);
  });
});
