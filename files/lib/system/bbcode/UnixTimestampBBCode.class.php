<?php

namespace wcf\system\bbcode;

use wcf\system\bbcode\AbstractBBCode;
use wcf\system\WCF;
use wcf\util\DateUtil;

/**
 * Implementation of the Unix-Timestamp BBCode.
 *
 * @author      Moritz Dahlke (DMedia)
 * @copyright   2022 DMedia Development
 * @license     GNU General Public License (GPL) <https://www.gnu.org/licenses/gpl-3.0.html>
 * @package     WoltLabSuite\Core\System\Bbcode
 */
class UnixTimestampBBCode extends AbstractBBCode
{
    /**
     * @inheritdoc
     */
    public function getParsedTag(array $openingTag, $content, array $closingTag, BBCodeParser $parser)
    {
        $value = '';

        if (!isset($openingTag['attributes'][0])) {
            return $value;
        }

        $timestamp = \intval($openingTag['attributes'][0]);

        if (!$this->isUnixTimestamp($timestamp)) {
            return $value;
        }

        $dateFormat = 'l, j. F Y';
        $timeFormat = 'H:i:s';

        if (isset($openingTag['attributes'][1]) && $openingTag['attributes'][1] != 'default') {
            $dateFormat = $openingTag['attributes'][1];
        }

        if (isset($openingTag['attributes'][2]) && $openingTag['attributes'][2] != 'default') {
            $timeFormat = $openingTag['attributes'][2];
        }

        $dateTime = DateUtil::getDateTimeByTimestamp($timestamp);

        $value = \str_replace(
            '%time%',
            DateUtil::format($dateTime, $timeFormat),
            \str_replace(
                '%date%',
                DateUtil::format($dateTime, $dateFormat),
                WCF::getLanguage()->get('wcf.date.dateTimeFormat')
            )
        );

        if (!isset($openingTag['attributes'][3]) || $parser->getOutputType() == 'text/plain') {
            return $value;
        }

        return \str_replace(
            '%ICON_NAME%',
            $openingTag['attributes'][3],
            '<span class="icon %ICON_NAME%"></span> '
        ) . $value;
    }

    /**
     * Returns 'true' if the value is a valid unix timestamp.
     *
     * @param  int $value
     * @return bool
     */
    protected function isUnixTimestamp($value)
    {
        if (!\is_numeric($value) || $value <= 0) {
            return false;
        }

        if ($value > 2147483647) {
            return false;
        }

        return true;
    }
}
