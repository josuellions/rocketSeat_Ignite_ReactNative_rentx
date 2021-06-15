import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { Calendar as CustomCalendar, DateCallbackHandler, LocaleConfig } from 'react-native-calendars';
import { generateInterval } from './genereteInterval';
import { ptBR  } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendar({ markedDates, onDayPress  }: CalendarProps){
  const themes = useTheme();

  return (
    <CustomCalendar
      renderArrow={( direction ) =>
        <Feather
          size={24}
          color={themes.colors.shape}
          name={direction == 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      headerStyle={{
        backgroundColor: themes.colors.backuground_secundary,
        borderBottomWidth: 0.5,
        borderBottomColor: themes.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayHeaderFontFamily: themes.fonts.primary_500,
        textMonthFontFamily: themes.fonts.secundary_600,
        textDayFontFamily: themes.fonts.primary_400,
        monthTextColor: themes.colors.title,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export {
  Calendar,
  generateInterval,
  MarkedDateProps,
  DayProps,
}
