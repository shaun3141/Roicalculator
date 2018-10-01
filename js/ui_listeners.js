$(document).on('keyup', '.productQty', function() {
  onDesiredProductsChage();
});

$(document).on('change', '#numDays', function() {
  appConfig.desiredDays = parseInt($(this).val());
  onDesiredProductsChage();
});

$(document).on('click', '#numGatherers', function() {
  appConfig.numGatherers = $(this).prop("checked") ? 5 : 3;
  onDesiredProductsChage();
});