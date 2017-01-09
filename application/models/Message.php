<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Message extends CI_Model 
{


	public function add_message($data)
	{
		$query="INSERT INTO messages
						(Name,
						Email,
						Subject,
						Message)
						VALUES (?,?,?,?)";

		$values=array(
			$data['Name'],
			$data['Email'],
			$data['Subject'],
			$data['Message']
			);
		$this->db->query($query,$values);
	}


	public function add_subscriber($data)
	{
		$query="INSERT INTO subscribers
						(Email)
						VALUES (?)";

		$values=array(
			$data['Email']
			);
		$this->db->query($query,$values);
	}


}