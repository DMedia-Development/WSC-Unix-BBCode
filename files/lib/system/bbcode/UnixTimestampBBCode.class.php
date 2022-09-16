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

        if (isset($openingTag['attributes'][0])) {
            $timestamp = \intval($openingTag['attributes'][0]);

            if (!$this->isUnixTimestamp($timestamp)) {
                return $value;
            }

            $dateTime = DateUtil::getDateTimeByTimestamp($timestamp);

            return \str_replace(
                '%time%',
                DateUtil::format($dateTime, 'H:i:s'),
                \str_replace(
                    '%date%',
                    DateUtil::format($dateTime, 'l, j. F Y'),
                    WCF::getLanguage()->get('wcf.date.dateTimeFormat')
                )
            );
        }

        return $value;
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
