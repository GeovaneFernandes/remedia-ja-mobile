import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/tokens';

// Formulário de cadastro de remédio, preenchido pelo cuidador.
export function MedicationFormScreen({
  onSubmit,
}: {
  onSubmit: (data: { name: string; dosage: string; timesOfDay: string[] }) => void;
}) {
  const [name, setName] = React.useState('');
  const [dosage, setDosage] = React.useState('');
  const [time, setTime] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo remédio</Text>
      <TextInput style={styles.input} placeholder="Nome do remédio" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Dosagem (ex: 1 comprimido)" value={dosage} onChangeText={setDosage} />
      <TextInput style={styles.input} placeholder="Horário (ex: 08:00)" value={time} onChangeText={setTime} />
      <Pressable
        style={styles.button}
        onPress={() => onSubmit({ name, dosage, timesOfDay: [time] })}
      >
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing(3), gap: spacing(2), backgroundColor: colors.background },
  title: { fontSize: fontSizes.title, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing(2) },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: spacing(2), fontSize: fontSizes.body },
  button: { backgroundColor: colors.brand, borderRadius: 12, padding: spacing(2), alignItems: 'center', marginTop: spacing(2) },
  buttonText: { color: '#FFFFFF', fontSize: fontSizes.label, fontWeight: '600' },
});
