//general UI animations control
$(document).ready(function() {
    if($('#startTransfer').val() != '') {
		$('#startTransfer').addClass('focused__field');
		$('#from__label').addClass('activated__label');
	}
	
	if($('#endTransfer').val() != '') {
		$('#endTransfer').addClass('focused__field');
		$('#to__label').addClass('activated__label');
	}

    $('#startTransfer').focusin(function() {
		$(this).addClass('focused__field');
		$('#from__label').addClass('activated__label');
        $('#transfer__from').addClass('invisi__line');
	});
	
	$('#startTransfer').focusout(function() {
		if($('#startTransfer').val() == '') {
			$(this).removeClass('focused__field');
			$('#from__label').removeClass('activated__label');
            $('#transfer__from').removeClass('invisi__line');
		}
	});
	
	$('#endTransfer').focusin(function() {
		$(this).addClass('focused__field');
		$('#to__label').addClass('activated__label');
        $('#transfer__to').addClass('invisi__line');
	});
	
	$('#endTransfer').focusout(function() {
		if($('#endTransfer').val() == '') {
			$(this).removeClass('focused__field');
			$('#to__label').removeClass('activated__label');
            $('#transfer__to').removeClass('invisi__line');
		}
	});

    var switcherRotation = 0;

    $('#form__switcher').click(function() {
		switcherRotation += 180;
		$(this).css({'transform': 'rotate(' + switcherRotation + 'deg)'});
		
		if($('#startTransfer').val() == '' && $('#endTransfer').val() == '') {
			//symbols sliding
			if($('.first__symbol').hasClass('sliding__down')) {
				$('.first__symbol').removeClass('sliding__down');
				$('.first__symbol').addClass('sliding__back');
			} else {
				$('.first__symbol').removeClass('sliding__back');
				$('.first__symbol').addClass('sliding__down');
			}
			
			if($('.second__symbol').hasClass('sliding__up')) {
				$('.second__symbol').removeClass('sliding__up');
				$('.second__symbol').addClass('sliding__back');
			} else {
				$('.second__symbol').removeClass('sliding__back');
				$('.second__symbol').addClass('sliding__up');
			}
			
			//fields sliding
			if($('#transfer__from').hasClass('sliding__down')) {
				$('#transfer__from').removeClass('sliding__down');
				$('#transfer__from').addClass('sliding__back');
			} else {
				$('#transfer__from').removeClass('sliding__back');
				$('#transfer__from').addClass('sliding__down');
			}
			
			if($('#transfer__to').hasClass('sliding__up')) {
				$('#transfer__to').removeClass('sliding__up');
				$('#transfer__to').addClass('sliding__back');
			} else {
				$('#transfer__to').removeClass('sliding__back');
				$('#transfer__to').addClass('sliding__up');
			}
		}
		
		else {
			var start_value = $('#startTransfer').val();
			var end_value = $('#endTransfer').val();
			
			if(start_value != '') {
				$('#endTransfer').addClass('focused__field');
				$('#to__label').addClass('activated__label');
			}
			
			if(end_value != '') {
				$('#startTransfer').addClass('focused__field');
				$('#from__label').addClass('activated__label');
			}
			
			$('#startTransfer').val(end_value);
			$('#endTransfer').val(start_value);
			
			$('#startHidden').val(end_value);
			$('#endHidden').val(start_value);
		}
	});

	$('#pad__closer').click(function() {
		$('.watertaxi__pad').removeAttr('style');
	});

	$('#togglePerimeter').change(function() {
		if($(this).is(':checked')) {
			$('#perimeter__corps').css({'transform': 'translateX(18px)'});
			$('#perimeter__tbody').css({'background-color': '#88fb88'});
			window.venicePolygon.setVisible(true);
			$('#toggle__label .bi').removeClass('bi-eye-slash');
			$('#toggle__label .bi').addClass('bi-eye');
			$('#toggle__label .bi').css({'color': '#ff5930'});
		} else {
			$('#perimeter__corps').removeAttr('style');
			$('#perimeter__tbody').removeAttr('style');
			window.venicePolygon.setVisible(false);
			$('#toggle__label .bi').removeClass('bi-eye');
			$('#toggle__label .bi').addClass('bi-eye-slash');
			$('#toggle__label .bi').removeAttr('style');
		}
	});

	$('.mobile__controls').click(function() {
		if(!$('.mobile__controls').hasClass('active')) {
			$('.closed').removeClass('closed');
			$('.explain__pad').addClass('opened');
			$('.mobile__controls').addClass('active');
			$('.mobile__controls button .bi').css({'transform': 'rotate(180deg)'});
			$('.mobile__controls button span').text('Collapse');
			$('.watertaxi__pad').removeAttr('style');
		} else {
			$('.opened').removeClass('opened');
			$('.explain__pad').addClass('closed');
			$('.mobile__controls').removeClass('active');
			$('.mobile__controls button .bi').removeAttr('style');
			$('.mobile__controls button span').text('Expand');
		}
	});
});