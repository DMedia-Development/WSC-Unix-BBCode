{if $__wcf->getBBCodeHandler()->isAvailableBBCode('unixtime')}
	<script data-relocate="true">
		require([
			"DMedia/BBCode/Unixtime"
		], (CkeditorBBCodeHandler) => {
			const element = document.getElementById('{$wysiwygSelector|encodeJS}');
			if (element === null) {
				throw new Error("Unable to find the source element '{$wysiwygSelector|encodeJS}' for the editor.");
			}

			new CkeditorBBCodeHandler.default(element);
		});
	</script>
{/if}