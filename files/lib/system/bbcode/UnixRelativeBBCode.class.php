<?php

namespace wcf\system\bbcode;

use wcf\system\bbcode\AbstractBBCode;
use wcf\util\DateUtil;

/**
 * Implementation of the Relative-Time BBCode for Unix-Timestamps.
 *
 * @author      Moritz Dahlke (DMedia)
 * @copyright   2023 DMedia Development
 * @license     GNU General Public License (GPL) <https://www.gnu.org/licenses/gpl-3.0.html>
 */
class UnixRelativeBBCode extends AbstractBBCode
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
            return $value;
        }

        $dateTime = DateUtil::getDateTimeByTimestamp($timestamp);
        $fullInterval = isset($openingTag['attributes'][1]) && $openingTag['attributes'][1] == 'full';

        $formattedText = DateUtil::formatInterval(
            $dateTime->diff(new \DateTime('now')),
            $fullInterval,
            DateUtil::FORMAT_SENTENCE
        );

        if ($parser->getOutputType() == 'text/plain') {
            return $formattedText;
        }

        return '<span title="' . DateUtil::format($dateTime, 'l, j. F Y H:i:s') . '">' . $formattedText . '</span>';
    }

    /**
     * Returns 'true' if the value is a valid unix timestamp.
     *
     * @param  int $value
     * @return bool
     */
    protected function isUnixTimestamp($value): bool
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
