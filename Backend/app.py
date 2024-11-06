from flask import Flask, request, jsonify
from flask_cors import CORS

#JULIO ADRIAN GALLEGOS BORRAZ
#ALBERTO SEBASTIAN MARTINEZ CORTES
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"]) 
class TuringMachine:
    def __init__(self, tape, transition_function, initial_state, final_states):
        self.tape = list(tape)
        self.head_position = 0
        self.current_state = initial_state
        self.transition_function = transition_function
        self.final_states = final_states
        self.step_by_step_trace = []

    def step(self):
        symbol = self.tape[self.head_position] if self.head_position < len(self.tape) else '_'
        if (self.current_state, symbol) in self.transition_function:
            # Obtener la transición correspondiente
            new_state, new_symbol, direction = self.transition_function[(self.current_state, symbol)]
            # Añadir a la traza para depuración
            self.step_by_step_trace.append(f"Estado: {self.current_state}, Posición: {self.head_position}, "
                                           f"Símbolo actual: {symbol}, Nuevo estado: {new_state}, "
                                           f"Escribir: {new_symbol}, Mover: {direction}")
            # Actualizar la cinta y mover la cabeza
            self.tape[self.head_position] = new_symbol
            self.current_state = new_state
            self.head_position += 1 if direction == 'R' else -1
        else:
            # Si no encuentra una transición, significa que ha encontrado un símbolo inesperado
            self.step_by_step_trace.append(f"Error: No hay transición desde el estado {self.current_state} con símbolo {symbol}")
            return False
        return True


    def run(self):
        while self.current_state not in self.final_states:
            if not self.step():
                break
        return self.current_state in self.final_states

    def print_trace(self):
        for trace in self.step_by_step_trace:
            print(trace)

transitions = {
    ('q0', 'P'): ('q1', 'P', 'R'), 
    ('q1', '0'): ('q2', '0', 'R'), 
    ('q2', '1'): ('q3', '1', 'R'), 
    ('q3', '0'): ('q4', '0', 'R'), 
    ('q4', '0'): ('q_accept', '0', 'R'), 
    ('q4', '1'): ('q_accept', '1', 'R'), 
    ('q4', '2'): ('q_accept', '2', 'R'), 
    ('q4', '3'): ('q_accept', '3', 'R'),
    ('q4', '5'): ('q_accept', '5', 'R'),
    ('q4', '6'): ('q_accept', '6', 'R'),
    ('q4', '7'): ('q_accept', '7', 'R'),
    ('q4', '8'): ('q_accept', '8', 'R'),
    ('q3', '1'): ('q6', '1', 'R'), 
    ('q6', '0'): ('q_accept', '0', 'R'), 
    ('q6', '1'): ('q_accept', '1', 'R'), 
    ('q6', '2'): ('q_accept', '2', 'R'), 
    ('q6', '3'): ('q_accept', '3', 'R'),
    ('q6', '5'): ('q_accept', '5', 'R'),
    ('q6', '6'): ('q_accept', '6', 'R'),
    ('q6', '7'): ('q_accept', '7', 'R'),
    ('q6', '8'): ('q_accept', '8', 'R'),
    ('q3', '2'): ('q8', '2', 'R'), 
    ('q8', '0'): ('q_accept', '0', 'R'), 
    ('q8', '1'): ('q_accept', '1', 'R'), 
    ('q8', '2'): ('q_accept', '2', 'R'), 
    ('q8', '3'): ('q_accept', '3', 'R'),
    ('q8', '5'): ('q_accept', '5', 'R'),
    ('q3', '3'): ('q10', '3', 'R'), 
    ('q10', '0'): ('q_accept', '0', 'R'), 
    ('q10', '1'): ('q_accept', '1', 'R'), 
    ('q10', '2'): ('q_accept', '2', 'R'), 
    ('q10', '3'): ('q_accept', '3', 'R'),
    ('q10', '4'): ('q_accept', '4', 'R'),
    ('q10', '5'): ('q_accept', '5', 'R'),
    ('q10', '6'): ('q_accept', '6', 'R'),
    ('q10', '7'): ('q_accept', '7', 'R'),
    ('q10', '8'): ('q_accept', '8', 'R'),
    ('q10', '9'): ('q_accept', '9', 'R'),
    ('q3', '4'): ('q12', '4', 'R'), 
    ('q12', '0'): ('q_accept', '0', 'R'), 
    ('q12', '1'): ('q_accept', '1', 'R'), 
    ('q12', '2'): ('q_accept', '2', 'R'), 
    ('q12', '3'): ('q_accept', '3', 'R'),
    ('q12', '4'): ('q_accept', '4', 'R'),
    ('q12', '5'): ('q_accept', '5', 'R'),
    ('q12', '6'): ('q_accept', '6', 'R'),
    ('q12', '7'): ('q_accept', '7', 'R'),
    ('q3', '5'): ('q14', '5', 'R'), 
    ('q14', '0'): ('q_accept', '0', 'R'), 
    ('q14', '1'): ('q_accept', '1', 'R'), 
    ('q14', '2'): ('q_accept', '2', 'R'), 
    ('q14', '3'): ('q_accept', '3', 'R'),
    ('q14', '4'): ('q_accept', '4', 'R'),
    ('q14', '5'): ('q_accept', '5', 'R'),
    ('q14', '6'): ('q_accept', '6', 'R'),
    ('q14', '7'): ('q_accept', '7', 'R'),
    ('q14', '8'): ('q_accept', '8', 'R'),
    ('q3', '6'): ('q17', '6', 'R'), 
    ('q17', '0'): ('q_accept', '0', 'R'), 
    ('q17', '1'): ('q_accept', '1', 'R'), 
    ('q17', '2'): ('q_accept', '2', 'R'), 
    ('q17', '3'): ('q_accept', '3', 'R'),
    ('q17', '4'): ('q_accept', '4', 'R'),
    ('q17', '5'): ('q_accept', '5', 'R'),
    ('q17', '6'): ('q_accept', '6', 'R'),
    ('q17', '7'): ('q_accept', '7', 'R'),
    ('q3', '7'): ('q18', '7', 'R'), 
    ('q18', '0'): ('q_accept', '0', 'R'), 
    ('q18', '1'): ('q_accept', '1', 'R'), 
    ('q18', '2'): ('q_accept', '2', 'R'), 
    ('q18', '3'): ('q_accept', '3', 'R'),
    ('q18', '4'): ('q_accept', '4', 'R'),
    ('q18', '5'): ('q_accept', '5', 'R'),
    ('q18', '6'): ('q_accept', '6', 'R'),
    ('q18', '7'): ('q_accept', '7', 'R'),
    ('q18', '8'): ('q_accept', '8', 'R'),
    ('q18', '9'): ('q_accept', '9', 'R'),
    ('q3', '8'): ('q20', '8', 'R'), 
    ('q20', '0'): ('q_accept', '0', 'R'),
}

# Estados de inicio, aceptación y rechazo
start_state = 'q0'
accept_state = 'q_accept'
reject_state = 'q_reject'


@app.route('/check-error', methods=['POST'])
def run_turing_machine():
    data = request.get_json()
    tape = data.get('code')
    print("Cadena recibida:", tape)

    turing_machine = TuringMachine(tape, transitions, initial_state='q0', final_states={'q_accept'})
    
    result = turing_machine.run()
    
    response = {
        "result": result,
        "final_state": turing_machine.current_state,
        "trace": turing_machine.step_by_step_trace
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)