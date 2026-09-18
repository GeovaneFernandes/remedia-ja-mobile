import * as Notifications from 'expo-notifications';
import { confirmDose } from './api';

// Agenda o alarme LOCAL de uma dose — funciona mesmo sem rede no exato
// horário (o backend, via reminder.service.ts, é a autoridade de
// escalonamento e o reforço por push; ver ARCHITECTURE.md do backend).
//
// REMINDER_REPEAT_MINUTES / REMINDER_MAX_ATTEMPTS espelham o padrão do
// backend (15 min, 2 tentativas) — mantidos em sincronia manual por ora;
// se um dia isso divergir, mover para uma config compartilhada no kit.
const REPEAT_MINUTES = 15;
const MAX_ATTEMPTS = 2;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDoseAlarms(doseLogId: string, medicationName: string, scheduledFor: Date) {
  const identifiers: string[] = [];

  for (let attempt = 0; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const fireDate = new Date(scheduledFor.getTime() + attempt * REPEAT_MINUTES * 60 * 1000);
    if (fireDate.getTime() <= Date.now()) continue;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora do remédio 💊',
        body: `Não se esqueça de tomar ${medicationName}.`,
        data: { doseLogId, attempt },
      },
      trigger: fireDate,
    });
    identifiers.push(id);
  }

  return identifiers;
}

// Chamado quando o idoso toca em "Já tomei" — confirma no backend e
// cancela qualquer lembrete futuro já agendado para esta dose.
export async function confirmDoseAndCancelAlarms(doseLogId: string, scheduledIdentifiers: string[]) {
  await confirmDose(doseLogId);
  await Promise.all(scheduledIdentifiers.map((id) => Notifications.cancelScheduledNotificationAsync(id)));
}
