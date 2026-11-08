from flask import Blueprint, jsonify, request
from database.db import get_connection
from decimal import Decimal
import traceback

pedidos_blueprint = Blueprint('pedidos', __name__, url_prefix='/api/pedidos')

def limpiar_decimales(registros):
    for reg in registros:
        for k, v in reg.items():
            if isinstance(v, Decimal):
                reg[k] = float(v)
    return registros

@pedidos_blueprint.route('/guardar', methods=['POST'])
def guardar_pedido():
    cursor = None
    connection = None
    try:
        datos = request.get_json()
        nombre = datos.get('NombreCliente')
        direccion = datos.get('Direccion')
        telefono = datos.get('Telefono')
        fecha = datos.get('FechaPedido')
        total = float(datos.get('TotalPedido', 0))

        connection = get_connection()
        cursor = connection.cursor()
        
        sql = """
            INSERT INTO pizzeriadb (NombreCliente, Direccion, Telefono, FechaPedido, TotalPedido) 
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (nombre, direccion, telefono, fecha, total))
        connection.commit()
        
        return jsonify({
            'mensaje': 'Pedido registrado correctamente',
            'exito': True
        }), 201

    except Exception as ex:
        traceback.print_exc()
        return jsonify({
            'mensaje': f"error {str(ex)}",
            'exito': False
        }), 500

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

@pedidos_blueprint.route('/todos', methods=['GET'])
def consultar_todos():
    cursor = None
    connection = None
    try:
        connection = get_connection()
        cursor = connection.cursor()
        
        sql = "SELECT * FROM pizzeriadb"
        cursor.execute(sql)
        ventas = limpiar_decimales(cursor.fetchall())
        total_general = sum(v['TotalPedido'] for v in ventas) if ventas else 0

        return jsonify({
            'ventas': ventas,
            'total_general': total_general,
            'mensaje': 'Todos los pedidos consultados',
            'exito': True
        }), 200

    except Exception as ex:
        traceback.print_exc()
        return jsonify({'mensaje': f"error {str(ex)}", 'exito': False}), 500

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

@pedidos_blueprint.route('/ventas/dia/<string:dia>', methods=['GET'])
def consultar_ventas_dia(dia):
    cursor = None
    connection = None
    try:
        connection = get_connection()
        cursor = connection.cursor()
        
        dias_map = {
            'lunes': 'Monday',
            'martes': 'Tuesday',
            'miercoles': 'Wednesday',
            'miércoles': 'Wednesday',
            'jueves': 'Thursday',
            'viernes': 'Friday',
            'sabado': 'Saturday',
            'sábado': 'Saturday',
            'domingo': 'Sunday'
        }
        
        dia_lower = dia.lower().strip()
        dia_ingles = dias_map.get(dia_lower, dia)
        
        if dia_ingles in dias_map.values() or dia_lower in dias_map:
            sql = "SELECT * FROM pizzeriadb WHERE DAYNAME(FechaPedido) = %s"
            cursor.execute(sql, (dia_ingles,))
        else:
            sql = "SELECT * FROM pizzeriadb WHERE FechaPedido LIKE %s"
            cursor.execute(sql, (f"%{dia}%",))
            
        ventas = limpiar_decimales(cursor.fetchall())
        total_dia = sum(v['TotalPedido'] for v in ventas) if ventas else 0

        return jsonify({
            'dia': dia,
            'ventas': ventas,
            'total_dia': total_dia,
            'mensaje': 'Ventas del día consultadas',
            'exito': True
        }), 200

    except Exception as ex:
        traceback.print_exc()
        return jsonify({'mensaje': f"error {str(ex)}", 'exito': False}), 500

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

@pedidos_blueprint.route('/ventas/mes/<string:mes>', methods=['GET'])
def consultar_ventas_mes(mes):
    cursor = None
    connection = None
    try:
        connection = get_connection()
        cursor = connection.cursor()
        
        meses_map = {
            'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
            'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
            'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
        }
        
        mes_lower = mes.lower().strip()
        filtro_mes = meses_map.get(mes_lower, mes)
        
        if filtro_mes.isdigit() and len(filtro_mes) == 2:
            sql = "SELECT * FROM pizzeriadb WHERE FechaPedido LIKE %s"
            cursor.execute(sql, (f"%-{filtro_mes}-%",))
        else:
            sql = "SELECT * FROM pizzeriadb WHERE FechaPedido LIKE %s"
            cursor.execute(sql, (f"%{filtro_mes}%",))
            
        ventas = limpiar_decimales(cursor.fetchall())
        total_mes = sum(v['TotalPedido'] for v in ventas) if ventas else 0

        return jsonify({
            'mes': mes,
            'ventas': ventas,
            'total_mes': total_mes,
            'mensaje': 'Ventas del mes consultadas',
            'exito': True
        }), 200

    except Exception as ex:
        traceback.print_exc()
        return jsonify({'mensaje': f"error {str(ex)}", 'exito': False}), 500

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

@pedidos_blueprint.route('/<int:id_pedido>', methods=['DELETE'])
def eliminar_pedido(id_pedido):
    cursor = None
    connection = None
    try:
        connection = get_connection()
        cursor = connection.cursor()
        
        sql = "DELETE FROM pizzeriadb WHERE id_pedido = %s"
        cursor.execute(sql, (id_pedido,))
        connection.commit()
        
        return jsonify({'mensaje': 'Pedido eliminado correctamente', 'exito': True}), 200

    except Exception as ex:
        traceback.print_exc()
        return jsonify({'mensaje': f"error {str(ex)}", 'exito': False}), 500

    finally:
        if cursor: cursor.close()
        if connection: connection.close()