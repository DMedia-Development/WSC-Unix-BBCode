<?php

namespace wcf\system\bbcode;

use wcf\system\WCF;
use wcf\util\DateUtil;

/**
 * Implementation of the Unix-Timestamp BBCode.
 *
 * @author      Moritz Dahlke (DMedia)
 * @copyright   2022-2025 DMedia Development
 * @license     GNU General Public License (GPL) <https://www.gnu.org/licenses/gpl-3.0.html>
 */
class UnixTimestampBBCode extends AbstractBBCode
{
    /**
     * @inheritdoc
     */
    public function getParsedTag(array $openingTag, $content, array $closingTag, BBCodeParser $parser): string
    {
        $value = '';

        if (!isset($openingTag['attributes'][0])) {
            return $value;
        }

        $timestamp = \intval($openingTag['attributes'][0]);

        if (!$this->isUnixTimestamp($timestamp)) {
            return $openingTag['attributes'][0];
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
            '<fa-icon name="%ICON_NAME%" solid></fa-icon> '
        ) . $value;
    }

    /**
     * Returns 'true' if the value is a valid unix timestamp.
     */
    protected function isUnixTimestamp(int $value): bool
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
